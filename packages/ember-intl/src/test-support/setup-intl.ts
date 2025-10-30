import { getContext, settled, type TestContext } from '@ember/test-helpers';

import type { Translations } from '../-private/utils/translations.ts';
import { addTranslations } from './add-translations.ts';

/**
 * In addition to the `hooks` object, you must specify the locale
 * under which your tests make sense.
 *
 * You may pass a `translations` object to stub the translations.
 *
 * @param {object} hooks
 * @param {string} locale
 * @param {object} [translations]
 */
export function setupIntl(
  hooks: NestedHooks,
  locale: string,
  translations?: Translations,
): void {
  hooks.beforeEach(async function (this: TestContext) {
    const { owner } = getContext() as TestContext;

    const intl = owner.lookup('service:intl');

    intl.setLocale(locale);
    intl.setOnMissingTranslation((key) => `t:${key}`);

    if (translations) {
      await addTranslations(locale, translations);
    } else {
      await settled();
    }
  });
}
