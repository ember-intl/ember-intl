import { analyzeProject, createOptions, lintProject } from './steps/index.js';
import type { CodemodOptions, LintResults } from './types/index.js';

export function runCodemod(codemodOptions: CodemodOptions): LintResults {
  const options = createOptions(codemodOptions);
  const project = analyzeProject(options);

  return lintProject(project);
}
