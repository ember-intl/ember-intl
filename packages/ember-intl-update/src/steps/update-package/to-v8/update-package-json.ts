import { writeFileSync } from 'node:fs';
import { EOL } from 'node:os';
import { join } from 'node:path';

import {
  convertToMap,
  convertToObject,
  type PackageJson,
  readPackageJson,
} from '@codemod-utils/package-json';

import type { Options, Todos } from '../../../types/index.js';

const latestVersions = {
  '@ember-intl/lint': '^1.1.2',
  '@ember-intl/v1-compat': '^1.0.9',
  '@ember-intl/vite': '^1.0.1',
  'ember-intl': '^8.2.4',
} as const;

function updateDependencies(packageJson: PackageJson, options: Options): void {
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

  switch (options.packageType) {
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
}

function updateScripts(packageJson: PackageJson): void {
  const scripts = convertToMap(packageJson['scripts']);

  scripts.set('lint:intl', 'ember-intl-lint');
  scripts.set('lint:intl:fix', 'ember-intl-lint --fix');

  packageJson['scripts'] = convertToObject(scripts) as Record<string, string>;
}

export function updatePackageJson(options: Options): Todos {
  const { packageType, projectRoot } = options;
  const todos: Todos = [];

  const packageJson = readPackageJson({ projectRoot });
  updateDependencies(packageJson, options);
  updateScripts(packageJson);

  todos.push(
    [
      'The codemod added `@ember-intl/lint` to `package.json`.',
      "If the script `lint:intl` doesn't pass, then run `lint:intl:fix` to create `ember-intl.config.mjs`.",
    ].join(' '),
  );

  if (packageType === 'v2-app') {
    todos.push(
      [
        'The codemod added `@ember-intl/vite` to `package.json`.',
        'In `app/routes/application.{js,ts}`, import translations from virtual modules. Then, pass them to the `intl` service by calling `addTranslations`.',
        'In `tsconfig.json`, add `@ember-intl/vite/virtual` to `compilerOptions.types`.',
        'In `vite.config.{mjs,mts}`, add `loadTranslations` to the list of plugins.',
      ].join(' '),
    );
  }

  const destination = join(projectRoot, 'package.json');
  const file = JSON.stringify(packageJson, null, 2).replaceAll('\n', EOL) + EOL;

  writeFileSync(destination, file, 'utf8');

  return todos;
}
