import type {
  LintMethod,
  LintResults,
  Options,
  Project,
} from '../types/index.js';
import { type LintRule, lintRuleMapping } from '../utils/lint-rules.js';

export async function lintProject(
  project: Project,
  options: Options,
): Promise<LintResults> {
  const { config } = options;
  const { lintRules } = config;

  const lintResults: Partial<LintResults> = {};

  for (const [lintRule, lintMethod] of Object.entries(lintRuleMapping) as [
    LintRule,
    LintMethod,
  ][]) {
    const lintRuleOptions = lintRules[lintRule];

    if (lintRuleOptions === false) {
      continue;
    }

    lintResults[lintRule] = await lintMethod(
      project,
      lintRuleOptions === true ? {} : lintRuleOptions,
      options,
    );
  }

  return lintResults as LintResults;
}
