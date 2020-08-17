import addTranslations from './add-translations';
import { missingMessage } from './-private/serialize-translation';
import type { TestContext as BaseTestContext } from 'ember-test-helpers';
import type IntlService from 'ember-intl/services/intl';
import type { Translations } from 'ember-intl/-private/store/translation';

export interface IntlTestContext {
  intl: IntlService;
}

export interface TestContext extends IntlTestContext, BaseTestContext {}

/**
 * Calling this helper will install a special `missing-message` util that will
 * serialize all missing translations in a deterministic manner, including
 * variables you've passed for interpolation. This means that you do not have
 * to explicitly add any translations and can just rely on the implicit
 * serialization. See the docs for detailed examples.
 *
 * Besides the `hooks` object you can also pass a `locale` string or array to
 * set the locale, as well as an object of `translations`, if you do want to
 * bootstrap translations. Both arguments are optional.
 *
 * @param {object} hooks
 * @param {string} [locale]
 * @param {object} [translations]
 */
export default function setupIntl(hooks: NestedHooks, locale?: string | string[], translations?: Translations) {
  if (typeof locale === 'object' && !Array.isArray(locale)) {
    translations = locale;
    locale = undefined;
  }

  hooks.beforeEach(function (this: TestContext) {
    this.owner.register('util:intl/missing-message', missingMessage);
    this.intl = this.owner.lookup('service:intl');
  });

  if (locale) {
    hooks.beforeEach(function (this: TestContext) {
      this.intl.setLocale(locale!);
    });
  }

  if (translations) {
    hooks.beforeEach(() => addTranslations(translations!));
  }
}
