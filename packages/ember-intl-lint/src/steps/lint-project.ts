import type { LintMethods, LintResults, Project } from '../types/index.js';
import {
  findMissingKeys,
  findUnusedKeys,
} from '../utils/lint-project/index.js';
import { lintRules } from '../utils/lint-rules.js';

const lintMethods: LintMethods = {
  'find-missing-keys': findMissingKeys,
  'find-unused-keys': findUnusedKeys,
};

export function lintProject(project: Project): LintResults {
  return lintRules.reduce((accumulator, lintRule) => {
    const lintMethod = lintMethods[lintRule];

    accumulator[lintRule] = lintMethod(project);

    return accumulator;
  }, {} as LintResults);
}
