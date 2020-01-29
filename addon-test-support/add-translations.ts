import { get } from '@ember/object';
import makeIntlHelper from './-private/make-intl-helper';
import pickLastLocale from './-private/pick-last-locale';
import IntlService from '../addon/services/intl';
import { Translations } from '../addon/models/translation';

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
export default makeIntlHelper((intl: IntlService, localeName: string | Translations, translations?: Translations) => {
  if (typeof localeName === 'object') {
    intl.addTranslations(pickLastLocale(get(intl, 'locale')!), localeName);
  } else if (translations) {
    intl.addTranslations(localeName, translations);
  }
});
