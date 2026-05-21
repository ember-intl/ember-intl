import { readFileSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

import { AST } from '@codemod-utils/ast-javascript';
import { findFiles, removeFiles } from '@codemod-utils/files';

import type { Options, Todos } from '../../../types/index.js';

type ObjectProperty = ReturnType<typeof AST.builders.objectProperty>;

const mapping = new Map([
  ['date', 'formatDate'],
  ['dateTimeRange', 'formatDateRange'],
  ['number', 'formatNumber'],
  ['relative', 'formatRelativeTime'],
  ['time', 'formatTime'],
]);

function renameKeys(file: string): string {
  const traverse = AST.traverse(true);

  const ast = traverse(file, {
    visitExportDefaultDeclaration(path) {
      if (path.node.declaration.type !== 'ObjectExpression') {
        return false;
      }

      path.node.declaration.properties =
        path.node.declaration.properties.reduce((accumulator, property) => {
          if (
            property.type !== 'ObjectProperty' ||
            property.key.type !== 'Identifier'
          ) {
            return accumulator;
          }

          const newName = mapping.get(property.key.name);

          if (newName === undefined) {
            return accumulator;
          }

          accumulator.push(
            AST.builders.objectProperty(
              AST.builders.identifier(newName),
              property.value,
            ),
          );

          return accumulator;
        }, [] as ObjectProperty[]);

      path.replace(
        AST.builders.exportNamedDeclaration(
          AST.builders.variableDeclaration('const', [
            AST.builders.variableDeclarator(
              AST.builders.identifier('formats'),
              path.node.declaration,
            ),
          ]),
        ),
      );

      return false;
    },
  });

  return AST.print(ast);
}

export function updateFormatsConfig(options: Options): Todos {
  const { packageType, projectRoot } = options;
  const todos: Todos = [];

  const pattern =
    packageType === 'v1-addon'
      ? 'tests/dummy/app/formats.js'
      : 'app/formats.js';

  const filePaths = findFiles(pattern, { projectRoot });
  const filePath = filePaths[0];

  if (filePath === undefined) {
    return todos;
  }

  let file = readFileSync(join(projectRoot, filePath), 'utf8');

  file = renameKeys(file);

  const newFilePath =
    packageType === 'v1-addon'
      ? 'tests/dummy/app/ember-intl.js'
      : 'app/ember-intl.js';

  writeFileSync(join(projectRoot, newFilePath), file, 'utf8');

  removeFiles([filePath], { projectRoot });

  todos.push(
    'Import `formats` from `app/ember-intl.js`. Then, pass it to the `intl` service by calling `setFormats`.',
  );

  return todos;
}
