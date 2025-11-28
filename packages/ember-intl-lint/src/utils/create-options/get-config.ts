import { join } from 'node:path';
import { pathToFileURL } from 'node:url';

import { findFiles } from '@codemod-utils/files';

import type { Config, LintOptions, LintRule } from '../../types/index.js';
import { lintRules } from '../lint-rules.js';

export async function getConfig(projectRoot: string): Promise<Config> {
  const config: Config = {
    addonPaths: [],
    rules: lintRules.reduce(
      (accumulator, lintRule) => {
        accumulator[lintRule] = true;

        return accumulator;
      },
      {} as Config['rules'],
    ),
  };

  const filePaths = findFiles('ember-intl-lint.config.{js,mjs}', {
    projectRoot,
  });

  if (filePaths.length === 0) {
    return config;
  }

  try {
    const fileURL = pathToFileURL(join(projectRoot, filePaths[0]!));

    const { default: userConfig } = (await import(fileURL.pathname)) as {
      default: Config;
    };

    if (userConfig.addonPaths) {
      config.addonPaths.push(...userConfig.addonPaths);
    }

    if (userConfig.rules) {
      for (const [lintRule, lintOptions] of Object.entries(
        userConfig.rules,
      ) as [LintRule, boolean | LintOptions][]) {
        if (!lintRules.includes(lintRule)) {
          throw new Error(`unknown rule: ${lintRule}`);
        }

        config.rules[lintRule] = lintOptions;
      }
    }

    return config;
  } catch (error) {
    throw new Error(
      `ERROR: Unable to read the config file. (${(error as Error).message})`,
    );
  }
}
