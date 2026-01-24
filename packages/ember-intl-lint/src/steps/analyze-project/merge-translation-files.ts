import { readFileSync } from 'node:fs';
import { join } from 'node:path';

import type {
  Options,
  Project,
  ProjectTranslationData,
  TranslationKey,
} from '../../types/index.js';
import {
  extractTranslations,
  sortTranslations,
} from '../../utils/analyze-project/merge-translation-files/index.js';

export function mergeTranslationFiles(
  translationFiles: Project['translationFiles'],
  options: Options,
): Project['translations'] {
  const { config, projectRoot } = options;
  const { buildOptions } = config;

  const translations: Project['translations'] = new Map();

  translationFiles.forEach((data, filePath) => {
    const file = readFileSync(join(projectRoot, filePath), 'utf8');

    const translationObject = extractTranslations(file, {
      filePath,
      namespaceKeys: buildOptions.wrapTranslationsWithNamespace,
      translationsDir: data.translationsDir,
    });

    const keyToData =
      translations.get(data.locale) ??
      new Map<TranslationKey, ProjectTranslationData>();

    for (const [key, message] of Object.entries(translationObject)) {
      keyToData.set(key, {
        filePath,
        message,
      });
    }

    translations.set(data.locale, keyToData);
  });

  if (buildOptions.fallbackLocale) {
    const fallbacksKeyToData = translations.get(buildOptions.fallbackLocale)!;

    translations.forEach((keyToData, locale) => {
      if (locale === buildOptions.fallbackLocale) {
        return;
      }

      fallbacksKeyToData.forEach((data, key) => {
        if (!keyToData.has(key)) {
          keyToData.set(key, data);
        }
      });

      translations.set(locale, keyToData);
    });
  }

  return sortTranslations(translations);
}
