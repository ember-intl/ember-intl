import type { LintErrors } from '../../../types/index.js';
import type { LintRule } from '../../lint-rules.js';

type StateArgs<T extends string> = {
  ignores: T[] | undefined;
  lintRule: LintRule;
};

export class LintRunWithIgnores<T extends string> {
  private ignores: Set<T>;
  private ignoresUnused: T[];
  private lintErrors: LintErrors;
  private lintRule: LintRule;

  constructor(args: StateArgs<T>) {
    this.ignores = new Set<T>(args.ignores ?? []);
    this.ignoresUnused = [];
    this.lintErrors = [];
    this.lintRule = args.lintRule;
  }

  getLintErrors(): LintErrors {
    return this.lintErrors;
  }

  record(status: 'fail' | 'pass', key: T): void {
    if (status === 'fail') {
      if (!this.ignores.has(key)) {
        this.lintErrors.push(key);
      }

      return;
    }

    if (this.ignores.has(key)) {
      this.ignoresUnused.push(key);
    }
  }

  reportUnusedIgnores(): void {
    const { ignoresUnused, lintRule } = this;

    if (ignoresUnused.length === 0) {
      return;
    }

    const list = ignoresUnused.sort().join(',');

    console.log(`⚠️ ${lintRule} has unused ignores (${list})`);
  }
}
