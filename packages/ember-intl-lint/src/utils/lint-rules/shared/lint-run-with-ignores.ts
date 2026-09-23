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

export class LintRunWithIgnores {
  private ignores: {
    exact: Set<string>;
    regex: RegExp[];
  };
  private ignoresNew: {
    exact: Set<string>;
    regex: RegExp[];
  };
  private lintErrors: LintErrors;
  private lintRule: LintRule;

  constructor(args: Args) {
    const ignores = args.ignores ?? [];

    this.ignores = {
      exact: new Set(ignores.filter((ignore) => typeof ignore === 'string')),
      regex: ignores.filter((ignore) => ignore instanceof RegExp),
    };
    this.ignoresNew = {
      exact: new Set(ignores.filter((ignore) => typeof ignore === 'string')),
      regex: ignores.filter((ignore) => ignore instanceof RegExp),
    };
    this.lintErrors = [];
    this.lintRule = args.lintRule;
  }

  async fix(projectRoot: string): Promise<void> {
    if (!this.hasIgnoresChanged()) {
      return;
    }

    const filePath = findUserConfig(projectRoot) ?? 'ember-intl.config.mjs';
    const userConfig = (await getUserConfig(projectRoot)) ?? {};

    userConfig.lintRules = {
      ...(userConfig.lintRules ?? {}),
      [this.lintRule]: {
        ignores: [
          ...Array.from(this.ignoresNew.exact).sort(),
          ...this.ignoresNew.regex.sort(),
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

  getLintErrors(): LintErrors {
    return this.lintErrors;
  }

  private hasIgnoresChanged(): boolean {
    const { ignores, ignoresNew } = this;

    const exactChanged =
      ignoresNew.exact.symmetricDifference(ignores.exact).size > 0;

    if (exactChanged) {
      return true;
    }

    return false;
  }

  record(data: DataForRecord): void {
    const { ignores, ignoresNew, lintErrors } = this;

    const ignoreByExact = ignores.exact.has(data.key);
    const ignoreByRegex = ignores.regex.some((regex) => regex.test(data.key));

    if (data.status === 'fail') {
      if (!ignoreByExact && !ignoreByRegex) {
        ignoresNew.exact.add(data.key);
        lintErrors.push(data.lintError);
      }

      return;
    }

    if (ignoreByExact) {
      ignoresNew.exact.delete(data.key);
    }
  }
}
