import { AST } from '@codemod-utils/ast-javascript';

type Decorator = ReturnType<typeof AST.builders.decorator>;

export type Dependencies = {
  helpers: {
    t: string | undefined;
    tKey: string | undefined;
  };
  services: {
    intl: string | undefined;
  };
};

export function findDependencies(file: string): Dependencies {
  const dependencies: Dependencies = {
    helpers: {
      t: undefined,
      tKey: undefined,
    },
    services: {
      intl: undefined,
    },
  };

  AST.traverse(file, {
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
            decorator.expression.callee.name !== 'service' ||
            path.node.key.type !== 'Identifier'
          ) {
            return false;
          }

          const param = decorator.expression.arguments[0];

          if (param === undefined) {
            if (path.node.key.name === 'intl') {
              dependencies.services.intl = path.node.key.name;
            }

            return false;
          }

          if (param.type === 'StringLiteral' && param.value === 'intl') {
            dependencies.services.intl = path.node.key.name;
          }

          break;
        }

        case 'Identifier': {
          if (
            decorator.expression.name !== 'service' ||
            path.node.key.type !== 'Identifier'
          ) {
            return false;
          }

          if (path.node.key.name === 'intl') {
            dependencies.services.intl = path.node.key.name;
          }

          break;
        }
      }

      return false;
    },

    visitImportDeclaration(path) {
      if (path.node.importKind !== 'value') {
        return false;
      }

      const importPath = path.node.source.value;
      const specifiers = path.node.specifiers;

      if (specifiers === undefined) {
        return false;
      }

      switch (importPath) {
        case 'ember-intl': {
          const t = specifiers.find((specifier) => {
            return (
              specifier.type === 'ImportSpecifier' &&
              specifier.imported.name === 't'
            );
          });

          if (t) {
            dependencies.helpers.t = t.local!.name as string;
          }

          const tKey = specifiers.find((specifier) => {
            return (
              specifier.type === 'ImportSpecifier' &&
              specifier.imported.name === 'tKey'
            );
          });

          if (tKey) {
            dependencies.helpers.tKey = tKey.local!.name as string;
          }

          break;
        }

        case 'ember-intl/helpers/t': {
          const t = specifiers.find((specifier) => {
            return (
              specifier.type === 'ImportDefaultSpecifier' &&
              specifier.local!.type === 'Identifier'
            );
          });

          if (t) {
            dependencies.helpers.t = t.local!.name as string;
          }

          break;
        }

        case 'ember-intl/helpers/t-key': {
          const tKey = specifiers.find((specifier) => {
            return (
              specifier.type === 'ImportDefaultSpecifier' &&
              specifier.local!.type === 'Identifier'
            );
          });

          if (tKey) {
            dependencies.helpers.tKey = tKey.local!.name as string;
          }

          break;
        }
      }

      return false;
    },
  });

  return dependencies;
}
