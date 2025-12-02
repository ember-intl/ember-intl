import type { TranslationJson, TranslationKey } from '../../../types/index.js';
import { forEach } from './shared/index.js';

export function inJson(file: string): TranslationKey[] {
  const keys: TranslationKey[] = [];

  if (file === '') {
    return keys;
  }

  const json = JSON.parse(file) as TranslationJson;

  forEach(json, {
    callback(key) {
      keys.push(key);
    },
  });

  return keys;
}
