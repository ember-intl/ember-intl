import { EOL } from 'node:os';

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

  const newFile = [
    `export default ${stringify(userConfig).replaceAll('\n', EOL)};`,
    '',
  ].join(EOL);

  return newFile;
}
