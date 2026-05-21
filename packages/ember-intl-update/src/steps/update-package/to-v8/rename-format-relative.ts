import { readFileSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

import { AST as ASTJavaScript } from '@codemod-utils/ast-javascript';
import { AST as ASTTemplate } from '@codemod-utils/ast-template';
import {
  updateJavaScript,
  updateTemplates,
} from '@codemod-utils/ast-template-tag';
import { findFiles, parseFilePath } from '@codemod-utils/files';

import type { Options } from '../../../types/index.js';

type Data = {
  from: string;
  to: string;
};

function updateHelperInvocations(
  file: string,
  data: Data,
): {
  file: string;
  update: boolean;
} {
  const traverse = ASTTemplate.traverse();
  let update = false;

  const ast = traverse(file, {
    MustacheStatement(node) {
      if (
        node.path.type !== 'PathExpression' ||
        node.path.original !== data.from
      ) {
        return;
      }

      node.path.original = data.to;
      update = true;
    },
  });

  return {
    file: ASTTemplate.print(ast),
    update,
  };
}

function updateServiceInvocations(
  file: string,
  data: Data,
): {
  file: string;
  update: boolean;
} {
  const traverse = ASTJavaScript.traverse(true);
  let update = false;

  const ast = traverse(file, {
    visitMemberExpression(path) {
      this.traverse(path);

      if (
        path.node.object.type !== 'MemberExpression' ||
        path.node.object.property.type !== 'Identifier' ||
        path.node.object.property.name !== 'intl'
      ) {
        return false;
      }

      if (
        path.node.property.type !== 'Identifier' ||
        path.node.property.name !== data.from
      ) {
        return false;
      }

      path.node.property.name = data.to;
      update = true;

      return false;
    },
  });

  return {
    file: ASTJavaScript.print(ast),
    update,
  };
}

function updateImports(file: string): {
  file: string;
  localName: string | undefined;
  update: boolean;
} {
  const traverse = ASTJavaScript.traverse(true);
  let localName: string | undefined;
  let update = false;

  const ast = traverse(file, {
    visitImportDeclaration(path) {
      switch (path.node.source.value) {
        case 'ember-intl': {
          path.node.specifiers?.forEach((specifier) => {
            if (
              specifier.type !== 'ImportSpecifier' ||
              specifier.imported.name !== 'formatRelative'
            ) {
              return;
            }

            localName = specifier.local?.name as string | undefined;
            specifier.imported.name = 'formatRelativeTime';
            update = true;
          });

          break;
        }

        case 'ember-intl/helpers/format-relative': {
          path.node.specifiers?.forEach((specifier) => {
            if (specifier.type !== 'ImportDefaultSpecifier') {
              return;
            }

            localName = specifier.local?.name as string | undefined;
            specifier.local!.name = 'formatRelativeTime';
            update = true;
          });

          path.node.source.value = 'ember-intl/helpers/format-relative-time';

          break;
        }
      }

      return false;
    },
  });

  return {
    file: ASTJavaScript.print(ast),
    localName,
    update,
  };
}

export function renameFormatRelative(options: Options): void {
  const { projectRoot, src } = options;

  const filePaths = findFiles(
    [
      `${src}/{components,templates}/**/*.{gjs,gts,hbs,js,ts}`,
      `tests/integration/**/*-test.{gjs,gts}`,
    ],
    {
      projectRoot,
    },
  );

  filePaths.forEach((filePath) => {
    let file = readFileSync(join(projectRoot, filePath), 'utf8');
    let update = false;

    const { ext } = parseFilePath(filePath);

    switch (ext) {
      case '.gjs':
      case '.gts': {
        file = updateJavaScript(file, (code) => {
          const results = updateServiceInvocations(code, {
            from: 'formatRelative',
            to: 'formatRelativeTime',
          });

          if (results.update) {
            update = true;
            return results.file;
          }

          return code;
        });

        let localName: string | undefined;

        file = updateJavaScript(file, (code) => {
          const results = updateImports(code);

          if (results.update) {
            localName = results.localName;
            update = true;
            return results.file;
          }

          return code;
        });

        if (localName) {
          file = updateTemplates(file, (code) => {
            const results = updateHelperInvocations(code, {
              from: localName!,
              to: 'formatRelativeTime',
            });

            return results.file;
          });
        }

        break;
      }

      case '.hbs': {
        const results = updateHelperInvocations(file, {
          from: 'format-relative',
          to: 'format-relative-time',
        });

        if (results.update) {
          file = results.file;
          update = true;
        }

        break;
      }

      case '.js':
      case '.ts': {
        const results = updateServiceInvocations(file, {
          from: 'formatRelative',
          to: 'formatRelativeTime',
        });

        if (results.update) {
          file = results.file;
          update = true;
        }

        break;
      }
    }

    if (update) {
      writeFileSync(join(projectRoot, filePath), file, 'utf8');
    }
  });
}
