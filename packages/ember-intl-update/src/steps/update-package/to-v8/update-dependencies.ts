import { writeFileSync } from 'node:fs';
import { EOL } from 'node:os';
import { join } from 'node:path';

import {
  convertToMap,
  convertToObject,
  readPackageJson,
} from '@codemod-utils/package-json';

import type { Options } from '../../../types/index.js';

const latestVersions = {
  '@ember-intl/lint': '^1.1.2',
  '@ember-intl/v1-compat': '^1.0.9',
  '@ember-intl/vite': '^1.0.1',
  'ember-intl': '^8.2.4',
} as const;

export function updateDependencies(options: Options): void {
  const { packageType, projectRoot } = options;

  const packageJson = readPackageJson({ projectRoot });
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

  devDependencies.set('@ember-intl/lint', latestVersions['@ember-intl/lint']);

  switch (packageType) {
    case 'v1-addon':
    case 'v1-app': {
      devDependencies.set(
        '@ember-intl/v1-compat',
        latestVersions['@ember-intl/v1-compat'],
      );

      break;
    }

    case 'v2-app': {
      devDependencies.set(
        '@ember-intl/vite',
        latestVersions['@ember-intl/vite'],
      );

      break;
    }
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

  const destination = join(projectRoot, 'package.json');
  const file = JSON.stringify(packageJson, null, 2).replaceAll('\n', EOL) + EOL;

  writeFileSync(destination, file, 'utf8');
}
