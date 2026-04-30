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
    visitClassProperty(node) {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      const decorators = node.value.decorators as Decorator[] | undefined;

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

          // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
          dependencies.services.intl = node.value.key.name as string;

          break;
        }

        case 'Identifier': {
          if (decorator.expression.name !== 'service') {
            return false;
          }

          if (
            // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
            node.value.key.type !== 'Identifier' ||
            // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
            node.value.key.name !== 'intl'
          ) {
            return false;
          }

          // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
          dependencies.services.intl = node.value.key.name as string;

          break;
        }
      }

      return false;
    },

    visitImportDeclaration(node) {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      if (data.isTypeScript && node.value.importKind !== 'value') {
        return false;
      }

      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
      const importPath = node.value.source.value;
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
      const specifiers = node.value.specifiers;

      switch (importPath) {
        case 'ember-intl': {
          // @ts-expect-error: Incorrect type
          // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
          const t = specifiers.find((specifier) => {
            return (
              // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
              specifier.type === 'ImportSpecifier' &&
              // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
              specifier.imported.name === 't'
            );
          });

          if (t) {
            // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
            dependencies.helpers.t = t.local.name as string;
          }

          // @ts-expect-error: Incorrect type
          // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
          const tKey = specifiers.find((specifier) => {
            return (
              // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
              specifier.type === 'ImportSpecifier' &&
              // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
              specifier.imported.name === 'tKey'
            );
          });

          if (tKey) {
            // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
            dependencies.helpers.tKey = tKey.local.name as string;
          }

          break;
        }

        case 'ember-intl/helpers/t': {
          // @ts-expect-error: Incorrect type
          // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
          const t = specifiers.find((specifier) => {
            return (
              // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
              specifier.type === 'ImportDefaultSpecifier' &&
              // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
              specifier.local.type === 'Identifier'
            );
          });

          if (t) {
            // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
            dependencies.helpers.t = t.local.name as string;
          }

          break;
        }

        case 'ember-intl/helpers/t-key': {
          // @ts-expect-error: Incorrect type
          // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
          const tKey = specifiers.find((specifier) => {
            return (
              // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
              specifier.type === 'ImportDefaultSpecifier' &&
              // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
              specifier.local.type === 'Identifier'
            );
          });

          if (tKey) {
            // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
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
