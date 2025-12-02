import yaml from 'js-yaml';

import type {
  TranslationJson,
  TranslationObject,
} from '../../../types/index.js';
import { forEach } from './shared/index.js';

export function inYaml(file: string): TranslationObject {
  const translationObject: TranslationObject = {};

  if (file === '') {
    return translationObject;
  }

  const json = yaml.load(file) as TranslationJson;

  forEach(json, {
    callback(key, value) {
      translationObject[key] = value;
    },
  });

  return translationObject;
}
