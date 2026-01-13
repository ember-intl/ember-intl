import type { Options } from '../types/index.js';
import { getConfig } from '../utils/create-options/index.js';

export async function createOptions(projectRoot: string): Promise<Options> {
  const config = await getConfig(projectRoot);

  return {
    config,
    projectRoot,
  };
}
