import { analyzeProject, createOptions, lintProject } from './steps/index.js';
import type { CodemodOptions, LintResults } from './types/index.js';

export async function runCodemod(
  codemodOptions: CodemodOptions,
): Promise<LintResults> {
  const options = await createOptions(codemodOptions);
  const project = await analyzeProject(options);

  return lintProject(project, options);
}
