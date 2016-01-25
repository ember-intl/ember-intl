/**
 * Copyright 2015, Yahoo! Inc.
 * Copyrights licensed under the New BSD License. See the accompanying LICENSE file for terms.
 */

import Ember from 'ember';
import getOwner from 'ember-getowner-polyfill';

import Translation from '../models/translation';

const { assert } = Ember;

function normalize (fullName) {
  assert('Lookup name must be a string', typeof fullName === 'string');

  return fullName.toLocaleLowerCase();
}

const DefaultIntlAdapter = Ember.Object.extend({
  translationsFor(localeName) {
    if (localeName && localeName instanceof Translation) {
      return localeName;
    }

    if (typeof localeName !== 'string') {
      throw new Error('locale name required for translation lookup');
    }

    const owner = getOwner(this);
    const lookupName = `ember-intl@translation:${normalize(localeName)}`;

    if (!owner.hasRegistration(lookupName)) {
      owner.register(lookupName, Translation.extend({}));
    }

    return owner.lookup(lookupName);
  },

  has(localeName, translationKey) {
    let translations = this.translationsFor(localeName);

    if (translations) {
      return translations.has(translationKey);
    }

    return false;
  },

  findTranslationByKey(locales, translationKey) {
    const len = locales.length;
    let i = 0;

    for (; i < len; i++) {
      const locale = locales[i];
      const translations = this.translationsFor(locale);

      if (translations && translations.has(translationKey)) {
        return translations.getValue(translationKey);
      }
    }
  }
});

export default DefaultIntlAdapter;
