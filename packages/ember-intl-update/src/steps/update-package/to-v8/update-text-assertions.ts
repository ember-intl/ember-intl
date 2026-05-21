import { readFileSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

import { AST } from '@codemod-utils/ast-javascript';
import { updateJavaScript } from '@codemod-utils/ast-template-tag';
import { findFiles, parseFilePath } from '@codemod-utils/files';

import type { Options } from '../../../types/index.js';

function simplify(expected: string): string | undefined {
  const matches = expected.match(/^(t:.+):\(.*\)$/);

  if (matches === null) {
    return undefined;
  }

  return matches[1];
}

function updateAssertion(file: string): {
  file: string;
  update: boolean;
} {
  const traverse = AST.traverse(true);
  let update = false;

  const ast = traverse(file, {
    visitCallExpression(path) {
      this.traverse(path);

      if (
        path.node.callee.type !== 'MemberExpression' ||
        path.node.callee.property.type !== 'Identifier'
      ) {
        return false;
      }

      switch (path.node.callee.property.name) {
        case 'containsText':
        case 'hasText':
        case 'hasTextContaining':
        case 'includesText': {
          const firstArgument = path.node.arguments[0];

          if (firstArgument?.type !== 'StringLiteral') {
            break;
          }

          const expected = simplify(firstArgument.value);

          if (expected) {
            firstArgument.value = expected;
            update = true;
          }

          break;
        }
      }

      return false;
    },
  });

  return {
    file: AST.print(ast),
    update,
  };
}

export function updateTextAssertions(options: Options): void {
  const { projectRoot } = options;

  const filePaths = findFiles(
    'tests/{acceptance,integration,unit}/**/*-test.{gjs,gts,js,ts}',
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
          const results = updateAssertion(code);

          if (results.update) {
            update = true;
            return results.file;
          }

          return code;
        });

        break;
      }

      case '.js':
      case '.ts': {
        const results = updateAssertion(file);

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
