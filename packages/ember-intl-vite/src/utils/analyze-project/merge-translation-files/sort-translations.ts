import type { Project, TranslationObject } from '../../../types/index.js';

export function sortTranslations(
  translations: Project['translations'],
): Project['translations'] {
  const translationsSorted: Project['translations'] = new Map();

  translations.forEach((translationObject, locale) => {
    const keys = Object.keys(translationObject).sort();

    const newTranslationObject = keys.reduce((accumulator, key) => {
      accumulator[key] = translationObject[key]!;

      return accumulator;
    }, {} as TranslationObject);

    translationsSorted.set(locale, newTranslationObject);
  });

  return translationsSorted;
}
