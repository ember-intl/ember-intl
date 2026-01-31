import type { Config, UserConfig } from '../../types/index.js';

export function mergeConfigs(
  config: Config,
  userConfig: UserConfig | undefined,
): Config {
  if (userConfig === undefined) {
    return config;
  }

  if (userConfig.addonPaths) {
    config.addonPaths = Array.from(
      new Set([...config.addonPaths, ...userConfig.addonPaths]),
    );
  }

  if (userConfig.buildOptions) {
    config.buildOptions = {
      ...config.buildOptions,
      ...userConfig.buildOptions,
    };
  }

  if (userConfig.lintRules) {
    config.lintRules = {
      ...config.lintRules,
      ...userConfig.lintRules,
    };
  }

  return config;
}
