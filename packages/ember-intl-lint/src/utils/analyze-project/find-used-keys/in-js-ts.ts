import type { Dependency, TranslationKey } from '../../../types/index.js';
import { findDependencies, inJavascript } from './shared/index.js';

export function inJsTs(
  file: string,
  customDependencies: Dependency[] = [],
): TranslationKey[] {
  const dependencies = findDependencies(file, customDependencies);

  const keys = inJavascript(file, { dependencies });

  return Array.from(new Set(keys)).sort();
}
