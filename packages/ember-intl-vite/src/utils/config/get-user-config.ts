import { join } from 'node:path';
import { pathToFileURL } from 'node:url';

import type { UserConfig } from '../../types/index.js';
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

    // Add timestamp to prevent caching the user config across tests
    const filePath = `${fileURL.href}?update=${Date.now()}`;

    const { default: userConfig } = (await import(filePath)) as {
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
