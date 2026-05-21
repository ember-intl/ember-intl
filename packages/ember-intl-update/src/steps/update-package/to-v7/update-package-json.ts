import { writeFileSync } from 'node:fs';
import { EOL } from 'node:os';
import { join } from 'node:path';

import {
  convertToMap,
  convertToObject,
  type PackageJson,
  readPackageJson,
} from '@codemod-utils/package-json';

import type { Options } from '../../../types/index.js';

const latestVersions = {
  'ember-intl': '^7.5.0',
} as const;

function updateDependencies(packageJson: PackageJson): void {
  const dependencies = convertToMap(packageJson['dependencies']) as Map<
    string,
    string
  >;
  const devDependencies = convertToMap(packageJson['devDependencies']) as Map<
    string,
    string
  >;

  if (dependencies.has('ember-intl')) {
    dependencies.set('ember-intl', latestVersions['ember-intl']);
  } else if (devDependencies.has('ember-intl')) {
    devDependencies.set('ember-intl', latestVersions['ember-intl']);
  }

  if (dependencies.size > 0) {
    packageJson['dependencies'] = convertToObject(dependencies) as Record<
      string,
      string
    >;
  }
  packageJson['devDependencies'] = convertToObject(devDependencies) as Record<
    string,
    string
  >;
}

export function updatePackageJson(options: Options): void {
  const { projectRoot } = options;

  const packageJson = readPackageJson({ projectRoot });
  updateDependencies(packageJson);

  const destination = join(projectRoot, 'package.json');
  const file = JSON.stringify(packageJson, null, 2).replaceAll('\n', EOL) + EOL;

  writeFileSync(destination, file, 'utf8');
}
