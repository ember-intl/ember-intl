import type {
  LintMethod,
  LintResults,
  Options,
  Project,
} from '../types/index.js';
import { type LintRule, lintRuleMapping } from '../utils/lint-rules.js';

export function lintProject(project: Project, options: Options): LintResults {
  const { config } = options;
  const { lintRules } = config;

  const lintResults: Partial<LintResults> = {};

  for (const [lintRule, lintMethod] of Object.entries(lintRuleMapping) as [
    LintRule,
    LintMethod,
  ][]) {
    const lintOptions = lintRules[lintRule];

    if (lintOptions === false) {
      continue;
    }

    console.time(`lintProject - ${lintRule}`);
    lintResults[lintRule] = lintMethod(
      project,
      lintOptions === true ? {} : lintOptions,
      options,
    );
    console.timeEnd(`lintProject - ${lintRule}`);
  }

  return lintResults as LintResults;
}
