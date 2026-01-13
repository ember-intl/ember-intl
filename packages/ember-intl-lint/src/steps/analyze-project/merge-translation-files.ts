import { readFileSync } from 'node:fs';
import { join } from 'node:path';

import type {
  Locale,
  Options,
  Project,
  TranslationObject,
} from '../../types/index.js';
import {
  inJson,
  inYaml,
} from '../../utils/analyze-project/merge-translation-files/index.js';

type Translations = Map<Locale, TranslationObject>;

export function mergeTranslationFiles(
  translationFiles: Project['translationFiles'],
  options: Options,
): Translations {
  const { config, projectRoot } = options;
  const { buildOptions } = config;

  const translations: Translations = new Map();

  translationFiles.forEach((data, filePath) => {
    const file = readFileSync(join(projectRoot, filePath), 'utf8');

    const parser = data.format === 'json' ? inJson : inYaml;

    const translationObject = parser(file, {
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

  return translations;

  // if (buildOptions.fallbackLocale === undefined) {
  //   return translations;
  // }

  // const translationsWithFallback: Translations = new Map();

  // const fallbackTranslationObject = translations.get(
  //   buildOptions.fallbackLocale,
  // );

  // translations.forEach((translationObject, locale) => {
  //   const newTranslationObject = Object.assign(
  //     {},
  //     fallbackTranslationObject,
  //     translationObject,
  //   );

  //   translationsWithFallback.set(locale, newTranslationObject);
  // });

  // return translationsWithFallback;
}
