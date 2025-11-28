/* eslint-disable @typescript-eslint/no-unsafe-member-access */
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

          dependencies.services.intl = node.value.key.name as string;

          break;
        }

        case 'Identifier': {
          if (decorator.expression.name !== 'service') {
            return false;
          }

          if (
            node.value.key.type !== 'Identifier' ||
            node.value.key.name !== 'intl'
          ) {
            return false;
          }

          dependencies.services.intl = node.value.key.name as string;

          break;
        }
      }

      return false;
    },

    visitImportDeclaration(node) {
      if (data.isTypeScript && node.value.importKind !== 'value') {
        return false;
      }

      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      const importPath = node.value.source.value;
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      const specifiers = node.value.specifiers;

      switch (importPath) {
        case 'ember-intl': {
          // @ts-expect-error: Incorrect type
          // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call
          const t = specifiers.find((specifier) => {
            return (
              specifier.type === 'ImportSpecifier' &&
              specifier.imported.name === 't'
            );
          });

          if (t) {
            dependencies.helpers.t = t.local.name as string;
          }

          // @ts-expect-error: Incorrect type
          // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call
          const tKey = specifiers.find((specifier) => {
            return (
              specifier.type === 'ImportSpecifier' &&
              specifier.imported.name === 'tKey'
            );
          });

          if (tKey) {
            dependencies.helpers.tKey = tKey.local.name as string;
          }

          break;
        }

        case 'ember-intl/helpers/t': {
          // @ts-expect-error: Incorrect type
          // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call
          const t = specifiers.find((specifier) => {
            return (
              specifier.type === 'ImportDefaultSpecifier' &&
              specifier.local.type === 'Identifier'
            );
          });

          if (t) {
            dependencies.helpers.t = t.local.name as string;
          }

          break;
        }

        case 'ember-intl/helpers/t-key': {
          // @ts-expect-error: Incorrect type
          // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call
          const tKey = specifiers.find((specifier) => {
            return (
              specifier.type === 'ImportDefaultSpecifier' &&
              specifier.local.type === 'Identifier'
            );
          });

          if (tKey) {
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
