import { join } from 'node:path';
import { pathToFileURL } from 'node:url';

import type { UserConfig } from '../../types/index.js';
import { type LintRule, lintRules } from '../lint-rules.js';
import { findUserConfig } from './find-user-config.js';
import { getDefaultConfig } from './get-default-config.js';

function validate(userConfig: undefined | UserConfig): void {
  if (userConfig === undefined) {
    return;
  }

  const defaultConfig = getDefaultConfig();

  if (userConfig.buildOptions) {
    const buildOptions = new Set(Object.keys(defaultConfig.buildOptions));

    Object.keys(userConfig.buildOptions).forEach((buildOption) => {
      if (!buildOptions.has(buildOption)) {
        throw new Error(`Unknown build option: ${buildOption}`);
      }
    });
  }

  if (userConfig.lintRules) {
    Object.keys(userConfig.lintRules).forEach((lintRule) => {
      if (!lintRules.includes(lintRule as LintRule)) {
        throw new Error(`Unknown lint rule: ${lintRule}`);
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
      default: undefined | UserConfig;
    };

    validate(userConfig);

    return userConfig;
  } catch (error) {
    throw new Error(
      `ERROR: Unable to read the config file. (${(error as Error).message})`,
      {
        cause: error,
      },
    );
  }
}
