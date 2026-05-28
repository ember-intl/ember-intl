import { AST } from '@codemod-utils/ast-javascript';

type Data = {
  from: string;
  to: string;
};

export function updateServiceInvocations(
  file: string,
  data: Data,
): {
  file: string;
  update: boolean;
} {
  let update = false;

  const ast = AST.traverse(file, {
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
    file: AST.print(ast),
    update,
  };
}
