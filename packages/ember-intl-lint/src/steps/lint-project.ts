import type {
  LintMethod,
  LintResults,
  Options,
  Project,
} from '../types/index.js';
import { type LintRule, lintRuleMapping } from '../utils/lint-rules.js';

export function lintProject(project: Project, options: Options): LintResults {
  const { config } = options;
  const lintResults: Partial<LintResults> = {};

  for (const [lintRule, lintMethod] of Object.entries(lintRuleMapping) as [
    LintRule,
    LintMethod,
  ][]) {
    const lintOptions = config.lintRules[lintRule];

    if (lintOptions === false) {
      continue;
    }

    lintResults[lintRule] = lintMethod(
      project,
      lintOptions === true ? {} : lintOptions,
    );
  }

  return lintResults as LintResults;
}
