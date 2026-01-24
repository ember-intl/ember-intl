import type {
  Locale,
  Project,
  ProjectTranslationData,
} from '../../types/index.js';

export function findAvailableKeys(
  translations: Project['translations'],
): Project['availableKeys'] {
  const availableKeys: Project['availableKeys'] = new Map();

  translations.forEach((keyToData, locale) => {
    keyToData.forEach((data, key) => {
      const localeToData =
        availableKeys.get(key) ?? new Map<Locale, ProjectTranslationData>();

      localeToData.set(locale, data);
      availableKeys.set(key, localeToData);
    });
  });

  return new Map(Array.from(availableKeys).sort());
}
