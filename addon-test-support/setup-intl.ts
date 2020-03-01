import addTranslations from './add-translations';
import { missingMessage } from './-private/serialize-translation';
import { Translations } from '../addon/models/translation';
import IntlService from '../app/services/intl';
import { TestContext } from 'ember-test-helpers';

export interface IntlTestContext extends TestContext {
  intl: IntlService;
}

interface NestedHooks {
  beforeEach: (fn: Function) => unknown;
}

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
export default function setupIntl(
  hooks: NestedHooks,
  locale?: string | string[] | Translations,
  translations?: Translations
) {
  hooks.beforeEach(function(this: IntlTestContext) {
    this.owner.register('util:intl/missing-message', missingMessage);
    this.intl = this.owner.lookup('service:intl');
  });

  if (typeof locale === 'string' || Array.isArray(locale)) {
    hooks.beforeEach(function(this: IntlTestContext) {
      this.intl!.setLocale(locale as string | string[]);
    });
  } else if (typeof locale === 'object') {
    hooks.beforeEach(() => addTranslations(locale));
  }

  if (translations) {
    hooks.beforeEach(() => addTranslations(translations));
  }
}
