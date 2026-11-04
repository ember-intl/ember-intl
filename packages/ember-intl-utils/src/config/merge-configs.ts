import type { Config, UserConfig } from './types.js';

export function mergeConfigs(
  config: Config,
  userConfig: undefined | UserConfig,
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

  if (userConfig.lintOptions?.rules) {
    config.lintOptions.rules = {
      ...config.lintOptions.rules,
      ...userConfig.lintOptions.rules,
    };
  } else if (userConfig.lintRules) {
    config.lintOptions.rules = {
      ...config.lintOptions.rules,
      ...userConfig.lintRules,
    };
  }

  if (userConfig.lintOptions?.dependencies) {
    const { dependencies } = userConfig.lintOptions;

    config.lintOptions.dependencies = {
      t: dependencies.t ?? config.lintOptions.dependencies.t,
      tKey: dependencies.tKey ?? config.lintOptions.dependencies.tKey,
    };
  }

  return config;
}
