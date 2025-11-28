import type { TranslationJson } from '../../../types/index.js';
import { forEach } from './shared/index.js';

export function inJson(file: string): string[] {
  const json = JSON.parse(file) as TranslationJson;
  const keys: string[] = [];

  forEach(json, {
    callback: (key) => {
      keys.push(key);
    },
  });

  return keys;
}
