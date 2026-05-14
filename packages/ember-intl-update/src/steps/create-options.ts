import { getPackageType, readPackageJson } from '@codemod-utils/package-json';

import type {
  CodemodOptions,
  Options,
  Src,
  TargetVersion,
} from '../types/index.js';
import { getTargetVersion } from '../utils/create-options/index.js';
import { SOURCE } from '../utils/ember.js';

function analyzePackage(projectRoot: string): {
  src: Src | undefined;
  targetVersion: TargetVersion | undefined;
} {
  const packageJson = readPackageJson({ projectRoot });
  const packageType = getPackageType(packageJson);

  const packageDependencies = new Map([
    ...Object.entries(packageJson['dependencies'] ?? {}),
    ...Object.entries(packageJson['devDependencies'] ?? {}),
  ]);

  const targetVersion = getTargetVersion(packageDependencies.get('ember-intl'));

  return {
    src: SOURCE[packageType],
    targetVersion,
  };
}

export function createOptions(codemodOptions: CodemodOptions): Options {
  const { projectRoot } = codemodOptions;
  const { src, targetVersion } = analyzePackage(projectRoot);

  if (src === undefined) {
    throw new Error('Unable to find an Ember project');
  }

  if (targetVersion === undefined) {
    throw new Error('Unable to find the target version for ember-intl');
  }

  return {
    projectRoot,
    src,
    targetVersion,
  };
}
