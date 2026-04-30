import { AST } from '@codemod-utils/ast-javascript';

type Decorator = ReturnType<typeof AST.builders.decorator>;

type Data = {
  isTypeScript: boolean;
};

export type Dependencies = {
  helpers: {
    t: string | undefined;
    tKey: string | undefined;
  };
  services: {
    intl: string | undefined;
  };
};

export function findDependencies(file: string, data: Data): Dependencies {
  const traverse = AST.traverse(data.isTypeScript);

  const dependencies: Dependencies = {
    helpers: {
      t: undefined,
      tKey: undefined,
    },
    services: {
      intl: undefined,
    },
  };

  traverse(file, {
    visitClassProperty(path) {
      // @ts-expect-error: Incorrect type
      const decorators = path.node.decorators as Decorator[] | undefined;

      if (decorators === undefined || decorators.length !== 1) {
        return false;
      }

      const decorator = decorators[0]!;

      switch (decorator.expression.type) {
        case 'CallExpression': {
          if (
            decorator.expression.callee.type !== 'Identifier' ||
            decorator.expression.callee.name !== 'service'
          ) {
            return false;
          }

          const param = decorator.expression.arguments[0]!;

          if (
            (param.type !== 'Literal' && param.type !== 'StringLiteral') ||
            param.value !== 'intl'
          ) {
            return false;
          }

          // @ts-expect-error: Incorrect type
          dependencies.services.intl = path.node.key.name as string;

          break;
        }

        case 'Identifier': {
          if (decorator.expression.name !== 'service') {
            return false;
          }

          if (
            path.node.key.type !== 'Identifier' ||
            path.node.key.name !== 'intl'
          ) {
            return false;
          }

          dependencies.services.intl = path.node.key.name;

          break;
        }
      }

      return false;
    },

    visitImportDeclaration(path) {
      if (data.isTypeScript && path.node.importKind !== 'value') {
        return false;
      }

      const importPath = path.node.source.value;
      const specifiers = path.node.specifiers;

      switch (importPath) {
        case 'ember-intl': {
          // @ts-expect-error: Incorrect type
          const t = specifiers.find((specifier) => {
            return (
              specifier.type === 'ImportSpecifier' &&
              specifier.imported.name === 't'
            );
          });

          if (t) {
            // @ts-expect-error: Incorrect type
            dependencies.helpers.t = t.local.name as string;
          }

          // @ts-expect-error: Incorrect type
          const tKey = specifiers.find((specifier) => {
            return (
              specifier.type === 'ImportSpecifier' &&
              specifier.imported.name === 'tKey'
            );
          });

          if (tKey) {
            // @ts-expect-error: Incorrect type
            dependencies.helpers.tKey = tKey.local.name as string;
          }

          break;
        }

        case 'ember-intl/helpers/t': {
          // @ts-expect-error: Incorrect type
          const t = specifiers.find((specifier) => {
            return (
              specifier.type === 'ImportDefaultSpecifier' &&
              // @ts-expect-error: Incorrect type
              specifier.local.type === 'Identifier'
            );
          });

          if (t) {
            // @ts-expect-error: Incorrect type
            dependencies.helpers.t = t.local.name as string;
          }

          break;
        }

        case 'ember-intl/helpers/t-key': {
          // @ts-expect-error: Incorrect type
          const tKey = specifiers.find((specifier) => {
            return (
              specifier.type === 'ImportDefaultSpecifier' &&
              // @ts-expect-error: Incorrect type
              specifier.local.type === 'Identifier'
            );
          });

          if (tKey) {
            // @ts-expect-error: Incorrect type
            dependencies.helpers.tKey = tKey.local.name as string;
          }

          break;
        }
      }

      return false;
    },
  });

  return dependencies;
}
