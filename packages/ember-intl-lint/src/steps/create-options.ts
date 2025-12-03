import type { CodemodOptions, Options } from '../types/index.js';
import { getConfig } from '../utils/create-options/index.js';

export async function createOptions(
  codemodOptions: CodemodOptions,
): Promise<Options> {
  const { fix, projectRoot } = codemodOptions;
  const config = await getConfig(projectRoot);

  return {
    config,
    fix,
    projectRoot,
  };
}
