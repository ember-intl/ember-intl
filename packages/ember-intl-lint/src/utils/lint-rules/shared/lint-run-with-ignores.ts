import type { LintErrors } from '../../../types/index.js';
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

  getUnusedIgnores(): T[] {
    return Array.from(this.ignoresUnused).sort();
  }

  record(data: DataForRecord<T>): void {
    if (data.status === 'fail') {
      if (!this.ignores.has(data.ignore)) {
        this.lintErrors.push(data.lintError);
      }

      return;
    }

    if (this.ignores.has(data.ignore)) {
      this.ignoresUnused.add(data.ignore);
    }
  }

  reportUnusedIgnores(): void {
    const unusedIgnores = this.getUnusedIgnores();

    if (unusedIgnores.length === 0) {
      return;
    }

    console.log(
      `⚠️ ${this.lintRule} has unused ignores (${unusedIgnores.join(',')})`,
    );
  }
}
