import { join } from 'node:path';
import { pathToFileURL } from 'node:url';

import type { Config, UserConfig, UserConfigV1 } from '../../types/index.js';
import { findUserConfig } from './find-user-config.js';
import { getDefaultConfig } from './get-default-config.js';

function transform(
  userConfig: undefined | UserConfigV1,
): undefined | UserConfig {
  if (userConfig === undefined) {
    return undefined;
  }

  const newUserConfig: UserConfig = {};

  if (userConfig.addonPaths) {
    newUserConfig.addonPaths = userConfig.addonPaths;
  }

  if (userConfig.buildOptions) {
    const buildOptions: Partial<Config['buildOptions']> = {};

    const {
      fallbackLocale,
      inputPath,
      namespaceKeysByDir,
      translationsDir,
      wrapTranslationsWithNamespace,
    } = userConfig.buildOptions;

    if (fallbackLocale) {
      buildOptions.fallbackLocale = fallbackLocale;
    }

    if (namespaceKeysByDir) {
      buildOptions.namespaceKeysByDir = namespaceKeysByDir;
    } else if (wrapTranslationsWithNamespace) {
      buildOptions.namespaceKeysByDir = wrapTranslationsWithNamespace;
    }

    if (translationsDir) {
      buildOptions.translationsDir = translationsDir;
    } else if (inputPath) {
      buildOptions.translationsDir = inputPath;
    }

    newUserConfig.buildOptions = buildOptions;
  }

  if (userConfig.lintRules) {
    newUserConfig.lintRules = userConfig.lintRules;
  }

  return newUserConfig;
}

function validate(userConfig: undefined | UserConfigV1): void {
  if (userConfig === undefined) {
    return;
  }

  const defaultConfig = getDefaultConfig();

  if (userConfig.buildOptions) {
    const buildOptions = new Set([
      ...Object.keys(defaultConfig.buildOptions),
      'fallbackLocale',
      'inputPath',
      'wrapTranslationsWithNamespace',
    ]);

    Object.keys(userConfig.buildOptions).forEach((buildOption) => {
      if (!buildOptions.has(buildOption)) {
        throw new Error(`Unknown build option: ${buildOption}`);
      }

      switch (buildOption) {
        case 'inputPath': {
          console.log(
            'WARNING: `inputPath` will be replaced by `translationsDir` in @ember-intl/lint@2.0.0. You can rename the key now to ease migration.',
          );

          break;
        }

        case 'wrapTranslationsWithNamespace': {
          console.log(
            'WARNING: `wrapTranslationsWithNamespace` will be replaced by `namespaceKeysByDir` in @ember-intl/lint@2.0.0. You can rename the key now to ease migration.',
          );

          break;
        }
      }
    });
  }
}

export async function getUserConfig(
  projectRoot: string,
): Promise<undefined | UserConfig> {
  try {
    const configFilePath = findUserConfig(projectRoot);

    if (configFilePath === undefined) {
      return undefined;
    }

    const fileURL = pathToFileURL(join(projectRoot, configFilePath));

    const { default: userConfig } = (await import(fileURL.pathname)) as {
      default: undefined | UserConfigV1;
    };

    validate(userConfig);

    return transform(userConfig);
  } catch (error) {
    throw new Error(
      `ERROR: Unable to read the config file. (${(error as Error).message})`,
      {
        cause: error,
      },
    );
  }
}
