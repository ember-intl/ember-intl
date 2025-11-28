import type {
  LintMethods,
  LintResults,
  Options,
  Project,
} from '../types/index.js';
import {
  findMissingKeys,
  findUnusedKeys,
} from '../utils/lint-project/index.js';
import { lintRules } from '../utils/lint-rules.js';

const lintMethods: LintMethods = {
  'find-missing-keys': findMissingKeys,
  'find-unused-keys': findUnusedKeys,
};

export function lintProject(project: Project, options: Options): LintResults {
  const { config } = options;

  return lintRules.reduce((accumulator, lintRule) => {
    const lintOptions = config.rules[lintRule];

    if (lintOptions === false) {
      return accumulator;
    }

    const lintMethod = lintMethods[lintRule];

    accumulator[lintRule] =
      lintOptions === true
        ? lintMethod(project)
        : lintMethod(project, lintOptions);

    return accumulator;
  }, {} as LintResults);
}
