import { getContext, settled, type TestContext } from '@ember/test-helpers';

import type { TranslationJson } from '../-private/utils/translations.ts';

/**
 * Updates the translations as if you had somehow added them (e.g.
 * via lazy loading).
 *
 * @function addTranslations
 * @param {string} locale
 * @param {object} translations
 */
export async function addTranslations(
  locale: string,
  translations: TranslationJson,
): Promise<void> {
  const { owner } = getContext() as TestContext;

  const intl = owner.lookup('service:intl');

  intl.addTranslations(locale, translations);

  await settled();
}
