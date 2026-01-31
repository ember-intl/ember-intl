import type { LintErrors } from '../../../types/index.js';
import type { LintRule } from '../../lint-rules.js';

type Args<T extends string> = {
  ignores?: T[] | undefined;
  lintRule: LintRule;
};

export class LintRunWithIgnores<T extends string> {
  private ignores: Set<T>;
  private ignoresUnused: Set<T>;
  private lintErrors: LintErrors;
  private lintRule: LintRule;

  constructor(args: Args<T>) {
    this.ignores = new Set<T>(args.ignores ?? []);
    this.ignoresUnused = new Set<T>();
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
      this.ignoresUnused.add(key);
    }
  }

  reportUnusedIgnores(): void {
    const { ignoresUnused, lintRule } = this;

    if (ignoresUnused.size === 0) {
      return;
    }

    const list = Array.from(ignoresUnused).sort().join(',');

    console.log(`⚠️ ${lintRule} has unused ignores (${list})`);
  }
}
