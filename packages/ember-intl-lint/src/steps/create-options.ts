import type { CodemodOptions, Options } from '../types/index.js';
import { getConfig } from '../utils/create-options/index.js';

export async function createOptions(
  codemodOptions: CodemodOptions,
): Promise<Options> {
  const { projectRoot } = codemodOptions;
  const config = await getConfig(projectRoot);

  return {
    config,
    projectRoot,
  };
}
