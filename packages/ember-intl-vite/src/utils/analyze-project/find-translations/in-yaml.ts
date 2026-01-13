import yaml from 'js-yaml';

import type {
  TranslationJson,
  TranslationObject,
} from '../../../types/index.js';
import { forEach, getPrefix } from './shared/index.js';

type Data = Parameters<typeof getPrefix>[0];

export function inYaml(file: string, data: Data): TranslationObject {
  const translationObject: TranslationObject = {};

  if (file === '') {
    return translationObject;
  }

  const json = yaml.load(file) as TranslationJson;
  const prefix = getPrefix(data);

  forEach(json, {
    callback(key, value) {
      translationObject[key] = value;
    },
    prefix,
  });

  return translationObject;
}
