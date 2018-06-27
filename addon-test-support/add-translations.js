import { get } from '@ember/object';
import makeIntlHelper from './-private/make-intl-helper';
import pickLastLocale from './-private/pick-last-locale';

/**
 * Invokes the `addTranslations` method of the `intl` service. The first
 * parameter, the `localeName`, is optional and will default to the last
 * currently enabled locale. This means, that if you invoke this helper with
 * just translations, they will be added to the last locale and all other
 * locales will be tried before.
 *
 * @function
 * @param {string} [localeName]
 * @param {object} translations
 */
export const addTranslations = makeIntlHelper((intl, localeName, translations) => {
  if (typeof localeName === 'object') {
    translations = localeName;
    localeName = pickLastLocale(get(intl, 'locales'));
  }

  return intl.addTranslations(localeName, translations);
});
