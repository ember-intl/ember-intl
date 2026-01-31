import { join } from 'node:path';
import { pathToFileURL } from 'node:url';

import type { Config, UserConfig } from '../../types/index.js';
import { findUserConfig } from './find-user-config.js';
import { getDefaultConfig } from './get-default-config.js';

type BuildOption = keyof Config['buildOptions'];

function validateConfig(userConfig: UserConfig | undefined): void {
  if (userConfig === undefined) {
    return;
  }

  const defaultConfig = getDefaultConfig();

  if (userConfig.buildOptions) {
    const buildOptions = Object.keys(
      defaultConfig.buildOptions,
    ) as BuildOption[];

    Object.keys(userConfig.buildOptions).forEach((buildOption) => {
      if (!buildOptions.includes(buildOption as BuildOption)) {
        throw new Error(`Unknown build option: ${buildOption}`);
      }
    });
  }
}

export async function getUserConfig(
  projectRoot: string,
): Promise<UserConfig | undefined> {
  try {
    const configFilePath = findUserConfig(projectRoot);

    if (configFilePath === undefined) {
      return undefined;
    }

    const fileURL = pathToFileURL(join(projectRoot, configFilePath));

    const { default: userConfig } = (await import(fileURL.pathname)) as {
      default: UserConfig | undefined;
    };

    validateConfig(userConfig);

    return userConfig;
  } catch (error) {
    throw new Error(
      `ERROR: Unable to read the config file. (${(error as Error).message})`,
    );
  }
}
