import { readFileSync } from 'node:fs';
import { join } from 'node:path';

import type { Options, Project } from '../../types/index.js';
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

    const newTranslationObject = Object.assign(
      {},
      translations.get(data.locale),
      translationObject,
    );

    translations.set(data.locale, newTranslationObject);
  });

  if (buildOptions.fallbackLocale === undefined) {
    return sortTranslations(translations);
  }

  const translationsWithFallback: Project['translations'] = new Map();

  const fallbackTranslationObject = translations.get(
    buildOptions.fallbackLocale,
  );

  translations.forEach((translationObject, locale) => {
    const newTranslationObject = Object.assign(
      {},
      fallbackTranslationObject,
      translationObject,
    );

    translationsWithFallback.set(locale, newTranslationObject);
  });

  return sortTranslations(translationsWithFallback);
}
