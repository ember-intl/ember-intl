import { AST } from '@codemod-utils/ast-javascript';

import type { TranslationHelper } from '../../../../types/index.js';

type Decorator = ReturnType<typeof AST.builders.decorator>;

export type Dependencies = {
  helpers: Set<string>;
  services: {
    intl: string | undefined;
  };
};

const builtInHelpers: readonly TranslationHelper[] = [
  { importName: 't', importPath: 'ember-intl' },
  { importName: 'tKey', importPath: 'ember-intl' },
  { importName: 'default', importPath: 'ember-intl/helpers/t' },
  { importName: 'default', importPath: 'ember-intl/helpers/t-key' },
];

export function findDependencies(
  file: string,
  translationHelpers: readonly TranslationHelper[],
): Dependencies {
  const helpers = [...builtInHelpers, ...translationHelpers];

  const dependencies: Dependencies = {
    helpers: new Set(),
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

      specifiers.forEach((specifier) => {
        const importName =
          specifier.type === 'ImportDefaultSpecifier'
            ? 'default'
            : specifier.type === 'ImportSpecifier'
              ? specifier.imported.name
              : undefined;

        const isHelper = helpers.some((helper) => {
          return (
            helper.importPath === importPath && helper.importName === importName
          );
        });

        if (isHelper) {
          dependencies.helpers.add(specifier.local!.name as string);
        }
      });

      return false;
    },
  });

  return dependencies;
}
