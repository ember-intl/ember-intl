import type { TranslationKey } from '../../../types/index.js';
import { findDependencies, inJavascript } from './shared/index.js';

export function inJsTs(file: string): TranslationKey[] {
  const dependencies = findDependencies(file);

  const keys = inJavascript(file, { dependencies });

  return Array.from(new Set(keys)).sort();
}
