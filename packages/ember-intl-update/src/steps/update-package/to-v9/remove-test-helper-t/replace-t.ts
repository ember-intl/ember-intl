import { AST } from '@codemod-utils/ast-javascript';

export function replaceT(file: string): {
  file: string;
  update: boolean;
} {
  let lastImportDeclarationPath: unknown;
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

      if (!lastImportDeclarationPath) {
        lastImportDeclarationPath = path;
        // @ts-expect-error: Incorrect type
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      } else if (path.node.start > lastImportDeclarationPath.node.start) {
        lastImportDeclarationPath = path;
      }

      return false;
    },
  });

  // @ts-expect-error: Incorrect type
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
  const nodes = ast.program.body;
  // @ts-expect-error: Incorrect type
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const index = lastImportDeclarationPath?.name ?? -1;

  const replacementForT = AST.builders.functionDeclaration(
    AST.builders.identifier('t'),
    [AST.builders.identifier('key')],
    AST.builders.blockStatement([
      AST.builders.returnStatement(
        AST.builders.templateLiteral(
          [
            AST.builders.templateElement(
              {
                cooked: 'TODO: Add message for ',
                raw: 'TODO: Add message for ',
              },
              false,
            ),
            AST.builders.templateElement(
              {
                cooked: '',
                raw: '',
              },
              true,
            ),
          ],
          [AST.builders.identifier('key')],
        ),
      ),
    ]),
  );

  // eslint-disable-next-line @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
  nodes.splice(index + 1, 0, replacementForT);

  return {
    file: AST.print(ast),
    update,
  };
}
