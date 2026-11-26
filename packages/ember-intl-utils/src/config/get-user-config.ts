import { join } from 'node:path';
import { pathToFileURL } from 'node:url';

import { type LintRule, lintRules } from '../lint-rules.js';
import { findUserConfig } from './find-user-config.js';
import { getDefaultConfig } from './get-default-config.js';
import type { UserConfig } from './types.js';

function isDependencyOptions(value: unknown): boolean {
  return (
    typeof value === 'object' &&
    value !== null &&
    'importName' in value &&
    typeof value.importName === 'string' &&
    'importPath' in value &&
    typeof value.importPath === 'string'
  );
}

function validate(
  userConfig: undefined | UserConfig,
): asserts userConfig is UserConfig {
  if (userConfig === undefined) {
    throw new Error('missing default export');
  }

  const defaultConfig = getDefaultConfig();

  if (userConfig.buildOptions) {
    const buildOptions = new Set(Object.keys(defaultConfig.buildOptions));

    Object.keys(userConfig.buildOptions).forEach((buildOption) => {
      if (!buildOptions.has(buildOption)) {
        throw new Error(`unknown build option: ${buildOption}`);
      }
    });
  }

  if (userConfig.lintOptions) {
    const lintOptions = new Set(Object.keys(defaultConfig.lintOptions));

    Object.keys(userConfig.lintOptions).forEach((lintOption) => {
      if (!lintOptions.has(lintOption)) {
        throw new Error(`unknown lint option: ${lintOption}`);
      }
    });
  }

  if (userConfig.lintOptions?.dependencies) {
    const dependencies = new Set(
      Object.keys(defaultConfig.lintOptions.dependencies),
    );

    Object.entries(userConfig.lintOptions.dependencies).forEach(
      ([dependency, dependencyOptions]) => {
        if (!dependencies.has(dependency)) {
          throw new Error(`unknown dependency: ${dependency}`);
        }

        if (dependencyOptions === undefined) {
          return;
        }

        if (
          !Array.isArray(dependencyOptions) ||
          !dependencyOptions.every(isDependencyOptions)
        ) {
          throw new Error(
            `invalid dependency: ${dependency} (expected an array of { importName, importPath })`,
          );
        }
      },
    );
  }

  if (userConfig.lintOptions?.rules) {
    Object.keys(userConfig.lintOptions.rules).forEach((lintRule) => {
      if (!lintRules.includes(lintRule as LintRule)) {
        throw new Error(`unknown lint rule: ${lintRule}`);
      }
    });
  } else if (userConfig.lintRules) {
    console.warn(
      'DEPRECATION: In ember-intl.config.{mjs,mts}, the key `lintRules` will be replaced by `lintOptions.rules` in @ember-intl/lint@3.0.0. You can rename the key now to ease migration.',
    );

    Object.keys(userConfig.lintRules).forEach((lintRule) => {
      if (!lintRules.includes(lintRule as LintRule)) {
        throw new Error(`unknown lint rule: ${lintRule}`);
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
      `Unable to get ember-intl config (${(error as Error).message})`,
      {
        cause: error,
      },
    );
  }
}
