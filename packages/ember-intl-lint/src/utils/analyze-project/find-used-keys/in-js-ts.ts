import { getDefaultConfig } from '@ember-intl/utils/config';

import type { Options, TranslationKey } from '../../../types/index.js';
import { findDependencies, inJavascript } from './shared/index.js';

const defaultDependencyOptions = getDefaultConfig().lintOptions.dependencies;

export function inJsTs(
  file: string,
  dependencyOptions: Options['config']['lintOptions']['dependencies'] = defaultDependencyOptions,
): TranslationKey[] {
  const dependencies = findDependencies(file, dependencyOptions);

  const keys = inJavascript(file, { dependencies });

  return Array.from(new Set(keys)).sort();
}
