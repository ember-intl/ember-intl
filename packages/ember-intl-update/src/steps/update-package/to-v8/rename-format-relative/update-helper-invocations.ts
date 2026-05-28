import { AST } from '@codemod-utils/ast-template';

type Data = {
  from: string;
  to: string;
};

export function updateHelperInvocations(
  file: string,
  data: Data,
): {
  file: string;
  update: boolean;
} {
  let update = false;

  const ast = AST.traverse(file, {
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
    file: AST.print(ast),
    update,
  };
}
