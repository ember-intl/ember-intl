import type { Config, UserConfig } from '../../types/index.js';

type BuildOption = keyof Config['buildOptions'];

function getDefaultConfig(): Config {
  return {
    addonPaths: [],
    buildOptions: {
      fallbackLocale: undefined,
      inputPath: 'translations',
      publicOnly: false,
      wrapTranslationsWithNamespace: false,
    },
  };
}

function mergeConfigs(
  defaultConfig: Config,
  userConfig: UserConfig | undefined,
): Config {
  if (userConfig === undefined) {
    return defaultConfig;
  }

  if (userConfig.addonPaths) {
    defaultConfig.addonPaths.push(...userConfig.addonPaths);
  }

  if (userConfig.buildOptions) {
    const buildOptions = Object.keys(
      defaultConfig.buildOptions,
    ) as BuildOption[];

    for (const [buildOption, value] of Object.entries(
      userConfig.buildOptions,
    )) {
      if (!buildOptions.includes(buildOption as BuildOption)) {
        throw new Error(`unknown build option: ${buildOption}`);
      }

      // @ts-expect-error: Incorrect type
      defaultConfig.buildOptions[buildOption] = value;
    }
  }

  return defaultConfig;
}

export function getConfig(userConfig?: UserConfig): Config {
  try {
    const defaultConfig = getDefaultConfig();

    return mergeConfigs(defaultConfig, userConfig);
  } catch (error) {
    throw new Error(
      `ERROR: Unable to read the config file. (${(error as Error).message})`,
    );
  }
}
