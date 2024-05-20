import { assert } from '@ember/debug';
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
    const context = getContext();

    assert(
      'To use `setupIntl()`, make sure to call `setupTest()`, `setupRenderingTest()`, or `setupApplicationTest()`.',
      context,
    );

    const { owner } = context as TestContext;

    const intl = owner.lookup('service:intl') as IntlService;

    intl.setLocale(locale);
    intl.setOnMissingTranslation(onMissingTranslation);

    if (translations) {
      addTranslations(locale, translations);
    }

    await settled();
  });
}
