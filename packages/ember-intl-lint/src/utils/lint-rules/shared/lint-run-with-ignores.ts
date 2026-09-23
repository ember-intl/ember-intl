import { writeFileSync } from 'node:fs';
import { EOL } from 'node:os';
import { join } from 'node:path';

import type { LintErrors, UserConfig } from '../../../types/index.js';
import { findUserConfig, getUserConfig } from '../../config/index.js';
import type { LintRule } from '../../lint-rules.js';

type Args = {
  ignores?: (RegExp | string)[] | undefined;
  lintRule: LintRule;
};

type DataForRecord =
  | {
      key: string;
      lintError: string;
      status: 'fail';
    }
  | {
      key: string;
      status: 'pass';
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

function toSetOfStrings(regexes: RegExp[]): Set<string> {
  return new Set(regexes.map((regex) => regex.toString()));
}

export class LintRunWithIgnores {
  private ignores: Ignores;
  private keysFailed: string[];
  private lintErrors: LintErrors;
  private lintRule: LintRule;

  constructor(args: Args) {
    const ignores = args.ignores ?? [];

    this.ignores = {
      exact: new Set(ignores.filter((ignore) => typeof ignore === 'string')),
      regex: ignores.filter((ignore) => ignore instanceof RegExp),
    };
    this.keysFailed = [];
    this.lintErrors = [];
    this.lintRule = args.lintRule;
  }

  async fix(projectRoot: string): Promise<void> {
    const ignoresNew = this.getIgnoresNew();

    if (ignoresNew === undefined) {
      return;
    }

    const filePath = findUserConfig(projectRoot) ?? 'ember-intl.config.mjs';
    const userConfig = (await getUserConfig(projectRoot)) ?? {};

    userConfig.lintRules = {
      ...(userConfig.lintRules ?? {}),
      [this.lintRule]: {
        ignores: [
          ...Array.from(ignoresNew.exact).sort(),
          ...ignoresNew.regex.sort(),
        ],
      },
    };

    const file = [
      `export default ${stringify(userConfig).replaceAll('\n', EOL)};`,
      '',
    ].join(EOL);

    writeFileSync(join(projectRoot, filePath), file, 'utf8');

    // Mark all errors as fixed
    this.lintErrors = [];
  }

  private getIgnoresNew(): Ignores | undefined {
    const { ignores, keysFailed } = this;

    const ignoresNew: Ignores = {
      exact: new Set(keysFailed),
      regex: [],
    };

    ignores.regex.forEach((regex) => {
      const used = keysFailed.some((key) => regex.test(key));

      if (used) {
        ignoresNew.regex.push(regex);
      }
    });

    if (ignoresNew.exact.symmetricDifference(ignores.exact).size > 0) {
      return ignoresNew;
    }

    const regexes = toSetOfStrings(ignores.regex);
    const regexesNew = toSetOfStrings(ignoresNew.regex);

    if (regexesNew.symmetricDifference(regexes).size > 0) {
      return ignoresNew;
    }

    return undefined;
  }

  getLintErrors(): LintErrors {
    return this.lintErrors;
  }

  record(data: DataForRecord): void {
    if (data.status === 'pass') {
      return;
    }

    const { ignores, keysFailed, lintErrors } = this;

    keysFailed.push(data.key);

    const ignoreByExact = ignores.exact.has(data.key);
    const ignoreByRegex = ignores.regex.some((regex) => regex.test(data.key));

    if (!ignoreByExact && !ignoreByRegex) {
      lintErrors.push(data.lintError);
    }
  }
}
