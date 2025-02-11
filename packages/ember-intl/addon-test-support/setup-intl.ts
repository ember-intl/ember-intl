import { getContext, settled, type TestContext } from '@ember/test-helpers';
import type { IntlService } from 'ember-intl';
import type { Translations } from 'ember-intl/-private/utils/translations';

import { onMissingTranslation } from './-private/on-missing-translation';
import { addTranslations } from './add-translations';

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

    const intl = owner.lookup('service:intl') as IntlService;

    intl.setLocale(locale);
    intl.setOnMissingTranslation(onMissingTranslation);

    if (translations) {
      await addTranslations(locale, translations);
    } else {
      await settled();
    }
  });
}
