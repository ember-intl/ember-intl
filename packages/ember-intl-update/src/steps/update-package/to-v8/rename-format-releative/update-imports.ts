import { AST } from '@codemod-utils/ast-javascript';

export function updateImports(file: string): {
  file: string;
  localName: string | undefined;
  update: boolean;
} {
  const traverse = AST.traverse(true);
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
    file: AST.print(ast),
    localName,
    update,
  };
}
