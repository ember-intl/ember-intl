import { relative, sep } from 'node:path';

import { parseFilePath } from '@codemod-utils/files';
import { load } from 'js-yaml';

import type {
  TranslationFilePath,
  TranslationJson,
  TranslationKey,
  TranslationMessage,
} from '../../../types/index.js';

type Data = {
  filePath: TranslationFilePath;
  namespaceKeysByDir: boolean;
  translationsDir: string;
};

type TranslationJsonRaw = {
  [key: TranslationKey]: TranslationJsonRaw | TranslationMessage;
};

function getPrefix(data: Data): string {
  if (!data.namespaceKeysByDir) {
    return '';
  }

  const { dir } = parseFilePath(data.filePath);
  const relativePath = relative(data.translationsDir, dir);

  if (relativePath === '') {
    return '';
  }

  const prefix = relativePath.replaceAll(sep, '.');

  return `${prefix}.`;
}

function traverse(
  json: TranslationJsonRaw,
  data: {
    callback: (key: TranslationKey, message: TranslationMessage) => void;
    prefix: string;
  },
): void {
  for (const key in json) {
    if (!Object.hasOwn(json, key)) {
      continue;
    }

    const value = json[key]!;

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

export function extractTranslations(file: string, data: Data): TranslationJson {
  const translationJson: TranslationJson = {};

  if (file === '') {
    return translationJson;
  }

  const { ext } = parseFilePath(data.filePath);

  try {
    const json =
      ext === '.json'
        ? (JSON.parse(file) as TranslationJsonRaw)
        : (load(file) as TranslationJsonRaw);

    const prefix = getPrefix(data);

    traverse(json, {
      callback(key, message) {
        translationJson[key] = message;
      },
      prefix,
    });
  } catch {
    // Do nothing
  }

  return translationJson;
}
