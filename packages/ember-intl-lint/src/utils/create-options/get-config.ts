import { join } from 'node:path';
import { pathToFileURL } from 'node:url';

import { findFiles } from '@codemod-utils/files';

import type { Config, LintOptions } from '../../types/index.js';
import { type LintRule, lintRules } from '../lint-rules.js';

function getDefaultConfig(): Config {
  const rules = {} as Config['rules'];

  lintRules.forEach((lintRule) => {
    rules[lintRule] = true;
  });

  return {
    addonPaths: [],
    rules,
  };
}

async function getUserConfig(
  projectRoot: string,
): Promise<Partial<Config> | undefined> {
  const filePaths = findFiles('ember-intl-lint.config.{js,mjs}', {
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
    default: Partial<Config> | undefined;
  };

  return userConfig;
}

function mergeConfigs(
  defaultConfig: Config,
  userConfig: Partial<Config> | undefined,
): Config {
  if (userConfig === undefined) {
    return defaultConfig;
  }

  if (userConfig.addonPaths) {
    defaultConfig.addonPaths.push(...userConfig.addonPaths);
  }

  if (userConfig.rules) {
    for (const [lintRule, lintOptions] of Object.entries(userConfig.rules) as [
      LintRule,
      boolean | LintOptions,
    ][]) {
      if (!lintRules.includes(lintRule)) {
        throw new Error(`unknown rule: ${lintRule}`);
      }

      defaultConfig.rules[lintRule] = lintOptions;
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
