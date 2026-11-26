import { AST } from '@codemod-utils/ast-javascript';

import type { Options } from '../../../../types/index.js';

type Decorator = ReturnType<typeof AST.builders.decorator>;

export type Dependencies = {
  helpers: Set<string>;
  services: {
    intl: string | undefined;
  };
};

type DependencyOptionsByKind = Options['config']['lintOptions']['dependencies'];

type ImportNamesByPath = Map<string, Set<string>>;

const cache = new WeakMap<DependencyOptionsByKind, ImportNamesByPath>();

function groupByImportPath(
  dependencyOptions: DependencyOptionsByKind,
): ImportNamesByPath {
  const cached = cache.get(dependencyOptions);

  if (cached) {
    return cached;
  }

  const importNamesByPath: ImportNamesByPath = new Map();

  [...dependencyOptions.t, ...dependencyOptions.tKey].forEach(
    ({ importName, importPath }) => {
      const importNames = importNamesByPath.get(importPath) ?? new Set();

      importNames.add(importName);
      importNamesByPath.set(importPath, importNames);
    },
  );

  cache.set(dependencyOptions, importNamesByPath);

  return importNamesByPath;
}

export function findDependencies(
  file: string,
  dependencyOptions: DependencyOptionsByKind,
): Dependencies {
  const importNamesByPath = groupByImportPath(dependencyOptions);

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

      if (typeof importPath !== 'string' || specifiers === undefined) {
        return false;
      }

      const importNames = importNamesByPath.get(importPath);

      if (importNames === undefined) {
        return false;
      }

      specifiers.forEach((specifier) => {
        let importName: string | undefined;

        if (specifier.type === 'ImportDefaultSpecifier') {
          importName = 'default';
        } else if (
          specifier.type === 'ImportSpecifier' &&
          specifier.imported.type === 'Identifier'
        ) {
          importName = specifier.imported.name;
        }

        if (importName === undefined || !importNames.has(importName)) {
          return;
        }

        dependencies.helpers.add(specifier.local!.name as string);
      });

      return false;
    },
  });

  return dependencies;
}
