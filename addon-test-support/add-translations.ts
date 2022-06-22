import { get } from '@ember/object';
import type IntlService from 'ember-intl/services/intl';
import type { Translations } from 'ember-intl/types';

import makeIntlHelper from './-private/make-intl-helper';
import pickLastLocale from './-private/pick-last-locale';

// ! Because TypeScript seems to short-circuit overloaded functions when passed
// as generics, including these overloads would not work with `makeIntlHelper`.
// function addTranslations(intl: IntlService, translations: Translations): void;
// function addTranslations(intl: IntlService, localeName: string, translations: Translations): void;
function addTranslations(
  intl: IntlService,
  localeNameOrTranslations: string | Translations,
  translations?: Translations
) {
  if (typeof localeNameOrTranslations === 'object') {
    translations = localeNameOrTranslations;
    localeNameOrTranslations = pickLastLocale(get(intl, 'locale'));
  }

  intl.addTranslations(localeNameOrTranslations, translations);
}

/**
 * Invokes the `addTranslations` method of the `intl` service. The first
 * parameter, the `localeName`, is optional and will default to the last
 * currently enabled locale. This means, that if you invoke this helper with
 * just translations, they will be added to the last locale and all other
 * locales will be tried before.
 *
 * @function addTranslations
 * @param {string} [localeName]
 * @param {object} translations
 */
export default makeIntlHelper(addTranslations);
