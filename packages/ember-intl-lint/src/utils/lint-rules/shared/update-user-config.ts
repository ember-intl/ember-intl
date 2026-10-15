import { EOL } from 'node:os';

import { AST } from '@codemod-utils/ast-javascript';

import type { LintRule, UserConfig } from '../../../types/index.js';

type Data = {
  ignoresNew: Ignores;
  lintRule: LintRule;
  userConfig: UserConfig;
};

type Ignores = {
  exact: Set<string>;
  regex: RegExp[];
};

function stringify(userConfig: UserConfig): string {
  const regexs: RegExp[] = [];

  function replacer(_key: string, value: RegExp | string): string {
    if (value instanceof RegExp) {
      regexs.push(value);

      return `__REGEX-PLACEHOLDER-${regexs.length - 1}__`;
    }

    return value;
  }

  return JSON.stringify(userConfig, replacer, 2).replaceAll(
    /"__REGEX-PLACEHOLDER-(\d+)__"/g,
    (_match, id) => {
      const index = Number(id);

      return regexs[index]!.toString();
    },
  );
}

export function updateUserConfig(file: string, data: Data): string {
  const { ignoresNew, lintRule, userConfig } = data;

  userConfig.lintRules = {
    ...(userConfig.lintRules ?? {}),
    [lintRule]: {
      ignores: [
        ...Array.from(ignoresNew.exact).sort(),
        ...ignoresNew.regex.sort(),
      ],
    },
  };

  const userConfigStr = stringify(userConfig).replaceAll('\n', EOL);

  const ast = AST.traverse(file, {
    visitExportDefaultDeclaration(path) {
      switch (path.node.declaration.type) {
        case 'CallExpression': {
          const hasDefineConfig =
            path.node.declaration.callee.type === 'Identifier' &&
            path.node.declaration.callee.name === 'defineConfig';

          // @ts-expect-error: Incorrect type
          path.node.declaration = hasDefineConfig
            ? `defineConfig(${userConfigStr})`
            : userConfigStr;

          break;
        }

        case 'ObjectExpression': {
          // @ts-expect-error: Incorrect type
          path.node.declaration = userConfigStr;

          break;
        }

        case 'TSSatisfiesExpression': {
          const hasUserConfig =
            path.node.declaration.typeAnnotation.type === 'TSTypeReference' &&
            path.node.declaration.typeAnnotation.typeName.type ===
              'Identifier' &&
            path.node.declaration.typeAnnotation.typeName.name === 'UserConfig';

          // @ts-expect-error: Incorrect type
          path.node.declaration = hasUserConfig
            ? `${userConfigStr} satisfies UserConfig`
            : userConfigStr;

          break;
        }
      }

      return false;
    },
  });

  return AST.print(ast);
}
