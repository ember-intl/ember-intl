import { AST } from '@codemod-utils/ast-javascript';

function simplify(expected: string): string | undefined {
  const matches = expected.match(/^(t:.+):\(.*\)$/);

  if (matches === null) {
    return undefined;
  }

  return matches[1];
}

export function updateAssertion(file: string): {
  file: string;
  update: boolean;
} {
  let update = false;

  const ast = AST.traverse(file, {
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
