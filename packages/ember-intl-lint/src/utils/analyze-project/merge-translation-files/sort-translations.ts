import type { Project } from '../../../types/index.js';

export function sortTranslations(
  translations: Project['translations'],
): Project['translations'] {
  const translationsSorted: Project['translations'] = new Map();

  translations.forEach((keyToData, locale) => {
    const keyToDataSorted = new Map(Array.from(keyToData).sort());

    translationsSorted.set(locale, keyToDataSorted);
  });

  return translationsSorted;
}
