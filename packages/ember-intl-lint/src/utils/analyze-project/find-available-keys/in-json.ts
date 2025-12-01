import type { TranslationJson } from '../../../types/index.js';
import { forEach } from './shared/index.js';

export function inJson(file: string): string[] {
  const keys: string[] = [];

  if (file === '') {
    return keys;
  }

  const json = JSON.parse(file) as TranslationJson;

  forEach(json, {
    callback: (key) => {
      keys.push(key);
    },
  });

  return keys;
}
