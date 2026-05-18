import { getPackageType, readPackageJson } from '@codemod-utils/package-json';

import type { CodemodOptions, Options } from '../types/index.js';
import { getTargetVersion } from '../utils/create-options/index.js';
import { SOURCE } from '../utils/ember.js';

export function createOptions(codemodOptions: CodemodOptions): Options {
  const { projectRoot } = codemodOptions;

  const packageJson = readPackageJson({ projectRoot });
  const packageType = getPackageType(packageJson);

  if (packageType === 'node') {
    throw new Error('Unable to find an Ember project');
  }

  const src = SOURCE[packageType];

  const packageDependencies = new Map([
    ...Object.entries(packageJson['dependencies'] ?? {}),
    ...Object.entries(packageJson['devDependencies'] ?? {}),
  ]);

  const targetVersion = getTargetVersion(packageDependencies.get('ember-intl'));

  if (targetVersion === undefined) {
    throw new Error('Unable to find the target version for ember-intl');
  }

  return {
    packageType,
    projectRoot,
    src,
    targetVersion,
  };
}
