import type { Locale, Project, TranslationObject } from '../../types/index.js';
import { findIcuArguments } from '../../utils/icu-message/find-icu-arguments.js';

type Translations = Map<Locale, TranslationObject>;

export function findAvailableKeys(
  translations: Translations,
): Project['availableKeys'] {
  const availableKeys: Project['availableKeys'] = new Map();

  translations.forEach((translationObject, locale) => {
    for (const [key, message] of Object.entries(translationObject)) {
      const icuArguments = findIcuArguments(message);

      if (!availableKeys.has(key)) {
        availableKeys.set(key, new Map());
      }

      const mapping = availableKeys.get(key)!;

      mapping.set(locale, {
        icuArguments,
        message,
      });
    }
  });

  return new Map(Array.from(availableKeys).sort());
}
