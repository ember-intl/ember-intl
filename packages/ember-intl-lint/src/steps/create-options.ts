import { getPackageType, readPackageJson } from '@codemod-utils/package-json';

import type { CodemodOptions, Options } from '../types/index.js';
import { getConfig } from '../utils/create-options/index.js';

const SOURCE = {
  node: undefined,
  'v1-addon': 'addon',
  'v1-app': 'app',
  'v2-addon': 'src',
  'v2-app': 'app',
} as const;

function getSrc(projectRoot: string) {
  const packageJson = readPackageJson({ projectRoot });
  const packageType = getPackageType(packageJson);

  return SOURCE[packageType];
}

export async function createOptions(
  codemodOptions: CodemodOptions,
): Promise<Options> {
  const { fix, projectRoot } = codemodOptions;

  const config = await getConfig(projectRoot);
  const src = getSrc(projectRoot);

  if (src === undefined) {
    throw new Error('Unable to find an Ember project');
  }

  return {
    config,
    fix,
    projectRoot,
    src,
  };
}
