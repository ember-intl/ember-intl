import { readFileSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

import { AST } from '@codemod-utils/ast-javascript';
import { findFiles } from '@codemod-utils/files';

import type { Options } from '../../../types/index.js';

type Data = {
  isEsm: boolean;
};

const mapping: Record<string, string> = {
  fallbackLocale: 'fallbackLocale',
  inputPath: 'translationsDir',
  publicOnly: 'bundleSeparately',
  wrapTranslationsWithNamespace: 'namespaceKeysByDir',
};

function renameBuildOptions(file: string, data: Data): string {
  const ast = AST.traverse(file, {
    visitExportDefaultDeclaration(path) {
      if (!data.isEsm) {
        return false;
      }

      if (path.node.declaration.type !== 'ObjectExpression') {
        return false;
      }

      path.node.declaration.properties = path.node.declaration.properties.map(
        (property) => {
          if (
            property.type === 'ObjectProperty' &&
            property.key.type === 'Identifier' &&
            property.key.name === 'buildOptions' &&
            property.value.type === 'ObjectExpression'
          ) {
            property.value.properties = property.value.properties.map(
              (property) => {
                if (
                  property.type === 'ObjectProperty' &&
                  property.key.type === 'Identifier'
                ) {
                  const newName = mapping[property.key.name];

                  if (newName) {
                    property.key.name = newName;
                  }
                }

                return property;
              },
            );
          }

          return property;
        },
      );

      return false;
    },

    visitReturnStatement(path) {
      if (data.isEsm) {
        return false;
      }

      if (path.node?.argument?.type !== 'ObjectExpression') {
        return false;
      }

      path.node.argument.properties = path.node.argument.properties.map(
        (property) => {
          if (
            property.type === 'ObjectProperty' &&
            property.key.type === 'Identifier'
          ) {
            const newName = mapping[property.key.name];

            if (newName) {
              property.key.name = newName;
            }
          }

          return property;
        },
      );

      return false;
    },
  });

  return AST.print(ast);
}

export function updateEmberIntlConfig(options: Options): void {
  const { packageType, projectRoot } = options;
  let isEsm: boolean;
  let pattern: string;

  switch (packageType) {
    case 'v1-addon': {
      isEsm = false;
      pattern = 'tests/dummy/config/ember-intl.js';

      break;
    }

    case 'v1-app': {
      isEsm = false;
      pattern = 'config/ember-intl.js';

      break;
    }

    default: {
      isEsm = true;
      pattern = 'ember-intl.config.{js,mjs}';
    }
  }

  const filePaths = findFiles(pattern, { projectRoot });
  const filePath = filePaths[0];

  if (filePath === undefined) {
    return;
  }

  let file = readFileSync(join(projectRoot, filePath), 'utf8');

  file = renameBuildOptions(file, { isEsm });

  writeFileSync(join(projectRoot, filePath), file, 'utf8');
}
