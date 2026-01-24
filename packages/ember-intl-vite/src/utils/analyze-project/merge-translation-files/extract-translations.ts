import { relative, sep as separator } from 'node:path';

import { parseFilePath } from '@codemod-utils/files';
import yaml from 'js-yaml';

import type {
  TranslationFilePath,
  TranslationJson,
  TranslationKey,
  TranslationMessage,
  TranslationObject,
} from '../../../types/index.js';

type Data = {
  filePath: TranslationFilePath;
  namespaceKeys: boolean;
  translationsDir: string;
};

function getPrefix(data: Data): string {
  if (!data.namespaceKeys) {
    return '';
  }

  const { dir } = parseFilePath(data.filePath);
  const relativePath = relative(data.translationsDir, dir);

  if (relativePath === '') {
    return '';
  }

  return `${relativePath.replaceAll(separator, '.')}.`;
}

function traverse(
  translationJson: TranslationJson,
  data: {
    callback: (key: TranslationKey, message: TranslationMessage) => void;
    prefix: string;
  },
): void {
  for (const key in translationJson) {
    if (!Object.hasOwn(translationJson, key)) {
      continue;
    }

    const value = translationJson[key]!;

    if (typeof value === 'object') {
      traverse(value, {
        callback: data.callback,
        prefix: `${data.prefix}${key}.`,
      });

      continue;
    }

    data.callback(`${data.prefix}${key}`, value);
  }
}

export function extractTranslations(
  file: string,
  data: Data,
): TranslationObject {
  const translationObject: TranslationObject = {};

  if (file === '') {
    return translationObject;
  }

  const { ext } = parseFilePath(data.filePath);

  const translationJson =
    ext === '.json'
      ? (JSON.parse(file) as TranslationJson)
      : (yaml.load(file) as TranslationJson);

  const prefix = getPrefix(data);

  traverse(translationJson, {
    callback(key, message) {
      translationObject[key] = message;
    },
    prefix,
  });

  return translationObject;
}
