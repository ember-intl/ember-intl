import addTranslations from './add-translations';
import { missingMessage } from './-private/serialize-translation';

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
export function setupIntl(hooks, locale, translations) {
  if (typeof localeName === 'object' && !Array.isArray(locale)) {
    translations = locale;
    locale = null;
  }

  hooks.beforeEach(function() {
    this.owner.register('util:intl/missing-message', missingMessage);
    this.intl = this.owner.lookup('service:intl');

    this.addTranslations(translations);
  });

  if (locale) {
    hooks.beforeEach(function() {
      this.intl.setLocale(locale);
    });
  }

  if (translations) {
    hooks.beforeEach(() => addTranslations(translations));
  }
}
