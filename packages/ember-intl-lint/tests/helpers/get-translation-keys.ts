import type { Locale, Project, TranslationKey } from '../../src/types/index.js';

export function getTranslationKeys(
  translations: Project['translations'],
  locale: Locale,
): TranslationKey[] {
  return Array.from(translations.get(locale)!.keys());
}
