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

  for (const [lintRule, { lint }] of Object.entries(lintRuleMapping) as [
    LintRule,
    { lint: LintMethod },
  ][]) {
    const lintOptions = config.lintRules[lintRule];

    if (lintOptions === false) {
      continue;
    }

    if (lintOptions === true) {
      lintResults[lintRule] = lint(project);
    } else {
      lintResults[lintRule] = lint(project, lintOptions);
    }
  }

  return lintResults as LintResults;
}
