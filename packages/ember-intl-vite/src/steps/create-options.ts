import type { Options } from '../types/index.js';
import {
  getDefaultConfig,
  getUserConfig,
  mergeConfigs,
} from '../utils/config/index.js';

export async function createOptions(projectRoot: string): Promise<Options> {
  const userConfig = await getUserConfig(projectRoot);
  const config = mergeConfigs(getDefaultConfig(), userConfig);

  return {
    config,
    projectRoot,
  };
}
