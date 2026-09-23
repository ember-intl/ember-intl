import type {
  TranslationHelper,
  TranslationKey,
} from '../../../types/index.js';
import { findDependencies, inJavascript } from './shared/index.js';

export function inJsTs(
  file: string,
  translationHelpers: TranslationHelper[] = [],
): TranslationKey[] {
  const dependencies = findDependencies(file, translationHelpers);

  const keys = inJavascript(file, { dependencies });

  return Array.from(new Set(keys)).sort();
}
