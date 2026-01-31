import { getPackageType, readPackageJson } from '@codemod-utils/package-json';

import type { CodemodOptions, Options } from '../types/index.js';
import {
  getDefaultConfig,
  getUserConfig,
  mergeConfigs,
} from '../utils/config/index.js';

const SOURCE = {
  node: undefined,
  'v1-addon': 'addon',
  'v1-app': 'app',
  'v2-addon': 'src',
  'v2-app': 'app',
} as const;

type Src = (typeof SOURCE)[keyof typeof SOURCE];

function getSrc(projectRoot: string): Src {
  const packageJson = readPackageJson({ projectRoot });
  const packageType = getPackageType(packageJson);

  return SOURCE[packageType];
}

export async function createOptions(
  codemodOptions: CodemodOptions,
): Promise<Options> {
  const { fix, projectRoot } = codemodOptions;
  const src = getSrc(projectRoot);

  if (src === undefined) {
    throw new Error('Unable to find an Ember project');
  }

  const userConfig = await getUserConfig(projectRoot);
  const config = mergeConfigs(getDefaultConfig(), userConfig);

  return {
    config,
    fix,
    projectRoot,
    src,
  };
}
