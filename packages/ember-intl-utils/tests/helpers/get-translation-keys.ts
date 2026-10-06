import type {
  Locale,
  Project,
  TranslationKey,
} from '../../src/translations/types.js';

export function getTranslationKeys(
  translations: Project['translations'],
  locale: Locale,
): TranslationKey[] {
  return Array.from(translations.get(locale)!.keys());
}
