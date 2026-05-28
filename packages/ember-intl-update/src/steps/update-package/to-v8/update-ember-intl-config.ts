import { readFileSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

import { AST } from '@codemod-utils/ast-javascript';
import { findFiles, removeFiles } from '@codemod-utils/files';

import type { Options } from '../../../types/index.js';

type ObjectProperty = ReturnType<typeof AST.builders.objectProperty>;

type Data = {
  convertToEsm: boolean;
};

function removeBuildOptions(file: string, data: Data): string {
  let argumentProperties: ObjectProperty[] = [];

  let ast = AST.traverse(file, {
    visitReturnStatement(path) {
      if (path.node?.argument?.type !== 'ObjectExpression') {
        return false;
      }

      path.node.argument.properties = path.node.argument.properties.filter(
        (property) => {
          if (
            property.type === 'ObjectProperty' &&
            property.key.type === 'Identifier'
          ) {
            switch (property.key.name) {
              case 'fallbackLocale': {
                return property.value.type !== 'NullLiteral';
              }

              case 'inputPath':
              case 'publicOnly':
              case 'wrapTranslationsWithNamespace': {
                return true;
              }

              default: {
                return false;
              }
            }
          }

          return false;
        },
      );

      argumentProperties = path.node.argument.properties as ObjectProperty[];

      return false;
    },
  });

  if (data.convertToEsm && argumentProperties.length > 0) {
    ast = AST.traverse(file, {
      visitExpressionStatement(path) {
        if (path.node.expression.type !== 'AssignmentExpression') {
          return false;
        }

        const leftExpression = path.node.expression.left;

        const isDefaultExport =
          leftExpression.type === 'MemberExpression' &&
          leftExpression.object.type === 'Identifier' &&
          leftExpression.object.name === 'module' &&
          leftExpression.property.type === 'Identifier' &&
          leftExpression.property.name === 'exports';

        if (!isDefaultExport) {
          return false;
        }

        path.replace(
          AST.builders.exportDefaultDeclaration(
            AST.builders.objectExpression([
              AST.builders.objectProperty(
                AST.builders.identifier('buildOptions'),
                AST.builders.objectExpression(argumentProperties),
              ),
            ]),
          ),
        );

        return false;
      },
    });
  }

  return AST.print(ast);
}

export function updateEmberIntlConfig(options: Options): void {
  const { packageType, projectRoot } = options;

  const pattern =
    packageType === 'v1-addon'
      ? 'tests/dummy/config/ember-intl.js'
      : 'config/ember-intl.js';

  const filePaths = findFiles(pattern, { projectRoot });
  const filePath = filePaths[0];

  if (filePath === undefined) {
    return;
  }

  let file = readFileSync(join(projectRoot, filePath), 'utf8');

  if (packageType === 'v2-app') {
    file = removeBuildOptions(file, { convertToEsm: true });

    writeFileSync(join(projectRoot, 'ember-intl.config.mjs'), file, 'utf8');

    removeFiles([filePath], { projectRoot });
  } else {
    file = removeBuildOptions(file, { convertToEsm: false });

    writeFileSync(join(projectRoot, filePath), file, 'utf8');
  }
}
