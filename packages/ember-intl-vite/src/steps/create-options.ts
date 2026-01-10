import type { Options, UserConfig } from '../types/index.js';
import { getConfig } from '../utils/create-options/index.js';

export function createOptions(userConfig?: UserConfig): Options {
  const config = getConfig(userConfig);
  const projectRoot = process.cwd();

  return {
    config,
    projectRoot,
  };
}
