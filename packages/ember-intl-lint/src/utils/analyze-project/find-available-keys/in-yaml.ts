import yaml from 'js-yaml';

import type { TranslationJson } from '../../../types/index.js';
import { forEach } from './shared/index.js';

export function inYaml(file: string): string[] {
  const json = yaml.load(file) as TranslationJson;
  const keys: string[] = [];

  forEach(json, {
    callback: (key) => {
      keys.push(key);
    },
  });

  return keys;
}
