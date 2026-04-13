import { writeFileSync } from 'node:fs';
import { EOL } from 'node:os';
import { join } from 'node:path';

import type { LintErrors } from '../../../types/index.js';
import { findUserConfig, getUserConfig } from '../../config/index.js';
import type { LintRule } from '../../lint-rules.js';

type Args<T extends string> = {
  ignores?: T[] | undefined;
  lintRule: LintRule;
};

type DataForRecord<T extends string> =
  | {
      ignore: T;
      lintError: string;
      status: 'fail';
    }
  | {
      ignore: T;
      status: 'pass';
    };

export class LintRunWithIgnores<T extends string> {
  private hasIgnoresChanged: boolean;
  private ignores: Set<T>;
  private lintErrors: LintErrors;
  private lintRule: LintRule;

  constructor(args: Args<T>) {
    this.hasIgnoresChanged = false;
    this.ignores = new Set<T>(args.ignores ?? []);
    this.lintErrors = [];
    this.lintRule = args.lintRule;
  }

  async fix(projectRoot: string): Promise<void> {
    if (!this.hasIgnoresChanged) {
      return;
    }

    const filePath = findUserConfig(projectRoot) ?? 'ember-intl.config.mjs';
    const userConfig = (await getUserConfig(projectRoot)) ?? {};

    const ignores = Array.from(this.ignores).sort();

    userConfig.lintRules = {
      ...(userConfig.lintRules ?? {}),
      [this.lintRule]: {
        ignores,
      },
    };

    const file = [
      `export default ${JSON.stringify(userConfig, null, 2).replaceAll('\n', EOL)};`,
      '',
    ].join(EOL);

    writeFileSync(join(projectRoot, filePath), file, 'utf8');

    // Mark all errors as fixed
    this.lintErrors = [];
  }

  getLintErrors(): LintErrors {
    return this.lintErrors;
  }

  record(data: DataForRecord<T>): void {
    if (data.status === 'fail') {
      if (!this.ignores.has(data.ignore)) {
        this.ignores.add(data.ignore);
        this.hasIgnoresChanged = true;

        this.lintErrors.push(data.lintError);
      }

      return;
    }

    if (this.ignores.has(data.ignore)) {
      this.ignores.delete(data.ignore);
      this.hasIgnoresChanged = true;
    }
  }
}
