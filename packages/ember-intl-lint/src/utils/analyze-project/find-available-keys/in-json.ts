import type {
  TranslationJson,
  TranslationObject,
} from '../../../types/index.js';
import { forEach } from './shared/index.js';

export function inJson(file: string): TranslationObject {
  const translationObject: TranslationObject = {};

  if (file === '') {
    return translationObject;
  }

  const json = JSON.parse(file) as TranslationJson;

  forEach(json, {
    callback(key, value) {
      translationObject[key] = value;
    },
  });

  return translationObject;
}
