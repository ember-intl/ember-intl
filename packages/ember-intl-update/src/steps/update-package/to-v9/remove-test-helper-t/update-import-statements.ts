import { AST } from '@codemod-utils/ast-javascript';

export function updateImportStatements(file: string): {
  file: string;
  update: boolean;
} {
  let update = false;

  const ast = AST.traverse(file, {
    visitImportDeclaration(path) {
      switch (path.node.source.value) {
        case 'ember-intl/test-support': {
          if (path.node.specifiers === undefined) {
            break;
          }

          const numSpecifiersOriginal = path.node.specifiers.length;

          path.node.specifiers = path.node.specifiers.filter((specifier) => {
            return !(
              specifier.type === 'ImportSpecifier' &&
              specifier.imported.name === 't'
            );
          });

          update = path.node.specifiers.length !== numSpecifiersOriginal;

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
