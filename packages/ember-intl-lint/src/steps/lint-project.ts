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
    const lintOptions = config.rules[lintRule];

    if (lintOptions === false) {
      continue;
    }

    if (lintOptions === true) {
      lintResults[lintRule] = lintMethod(project);
    } else {
      lintResults[lintRule] = lintMethod(project, lintOptions);
    }
  }

  return lintResults as LintResults;
}
