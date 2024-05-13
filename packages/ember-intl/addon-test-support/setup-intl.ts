import {
  settled,
  type TestContext as BaseTestContext,
} from '@ember/test-helpers';
import type { IntlService } from 'ember-intl';
import type { Translations } from 'ember-intl/types';

import { missingMessage } from './-private/missing-message';
import { addTranslations } from './add-translations';

export interface IntlTestContext {
  intl: IntlService;
}

export interface TestContext extends IntlTestContext, BaseTestContext {}

/**
 * In addition to the `hooks` object, you must specify the locale
 * under which your tests make sense.
 *
 * You may pass a `translations` object to stub the translations.
 *
 * @param {object} hooks
 * @param {string} [locale]
 * @param {object} [translations]
 */
export function setupIntl(
  hooks: NestedHooks,
  locale: string,
  translations?: Translations,
): void {
  hooks.beforeEach(async function (this: TestContext) {
    this.owner.register('util:intl/missing-message', missingMessage);

    this.intl = this.owner.lookup('service:intl') as IntlService;

    this.intl.setLocale(locale);

    if (translations) {
      addTranslations(locale, translations);
    }

    await settled();
  });
}
