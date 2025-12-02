import type { TranslationKey } from '../../../types/index.js';
import { findDependencies, inJavascript } from './shared/index.js';

type Data = {
  isTypeScript: boolean;
};

export function inJsTs(file: string, data: Data): TranslationKey[] {
  const dependencies = findDependencies(file, {
    isTypeScript: data.isTypeScript,
  });

  const keys = inJavascript(file, {
    dependencies,
    isTypeScript: data.isTypeScript,
  });

  return Array.from(new Set(keys)).sort();
}
