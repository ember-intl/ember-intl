import { join } from 'node:path';
import { pathToFileURL } from 'node:url';

import { findFiles } from '@codemod-utils/files';

import type { Config, LintOptions, UserConfig } from '../../types/index.js';
import { type LintRule, lintRules } from '../lint-rules.js';

type BuildOption = keyof Config['buildOptions'];

function getDefaultConfig(): Config {
  const rules = {} as Config['lintRules'];

  lintRules.forEach((lintRule) => {
    rules[lintRule] = true;
  });

  return {
    addonPaths: [],
    buildOptions: {
      fallbackLocale: undefined,
      inputPath: 'translations',
      wrapTranslationsWithNamespace: false,
    },
    lintRules: rules,
  };
}

async function getUserConfig(
  projectRoot: string,
): Promise<UserConfig | undefined> {
  const filePaths = findFiles('ember-intl.config.{js,mjs}', {
    projectRoot,
  });

  if (filePaths.length === 0) {
    return undefined;
  }

  if (filePaths.length > 1) {
    throw new Error('found multiple config files');
  }

  const fileURL = pathToFileURL(join(projectRoot, filePaths[0]!));

  const { default: userConfig } = (await import(fileURL.pathname)) as {
    default: UserConfig | undefined;
  };

  return userConfig;
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

  if (userConfig.lintRules) {
    for (const [lintRule, lintOptions] of Object.entries(
      userConfig.lintRules,
    ) as [LintRule, boolean | LintOptions][]) {
      if (!lintRules.includes(lintRule)) {
        throw new Error(`unknown lint rule: ${lintRule}`);
      }

      defaultConfig.lintRules[lintRule] = lintOptions;
    }
  }

  return defaultConfig;
}

export async function getConfig(projectRoot: string): Promise<Config> {
  try {
    const defaultConfig = getDefaultConfig();
    const userConfig = await getUserConfig(projectRoot);

    return mergeConfigs(defaultConfig, userConfig);
  } catch (error) {
    throw new Error(
      `ERROR: Unable to read the config file. (${(error as Error).message})`,
    );
  }
}
