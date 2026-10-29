import { readFileSync, writeFileSync } from 'node:fs';
import { EOL } from 'node:os';
import { join } from 'node:path';

import { findUserConfig, getUserConfig } from '@ember-intl/utils/config';

import type { LintErrors, LintRule } from '../../../types/index.js';
import { updateUserConfig } from './update-user-config.js';

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

    const userConfig = await getUserConfig(projectRoot);
    let filePath: string;
    let file: string;

    if (userConfig) {
      filePath = findUserConfig(projectRoot)!;
      file = readFileSync(join(projectRoot, filePath), 'utf8');
    } else {
      filePath = 'ember-intl.config.mjs';
      file = [`export default {};`, ``].join(EOL);
    }

    file = updateUserConfig(file, {
      ignoresNew,
      lintRule: this.lintRule,
      userConfig: userConfig ?? {},
    });

    writeFileSync(join(projectRoot, filePath), file, 'utf8');

    // Mark all errors as fixed
    this.lintErrors = [];
  }

  private getIgnoresNew(): Ignores | undefined {
    const { ignores, keysFailed } = this;

    const ignoresNew: Ignores = {
      exact: new Set(keysFailed),
      regex: ignores.regex.filter((regex) => {
        return keysFailed.some((key) => regex.test(key));
      }),
    };

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

    if (
      ignores.exact.has(data.key) ||
      ignores.regex.some((regex) => regex.test(data.key))
    ) {
      return;
    }

    lintErrors.push(data.lintError);
  }
}
