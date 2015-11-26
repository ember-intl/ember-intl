/**
 * Copyright 2015, Yahoo! Inc.
 * Copyrights licensed under the New BSD License. See the accompanying LICENSE file for terms.
 */

import Ember from 'ember';
import getOwner from 'ember-getowner-polyfill';

import Translation from '../models/translation';

const { assert, makeArray } = Ember;

function normalize (fullName) {
  assert('Lookup name must be a string', typeof fullName === 'string');
  return fullName.toLocaleLowerCase();
}

const DefaultIntlAdapter = Ember.Object.extend({
  translationsFor(localeName) {
    if (localeName && localeName instanceof Translation) {
      return localeName;
    }

    const owner = getOwner(this);

    if (typeof localeName === 'string') {
      return owner.lookup('ember-intl@translation:' + normalize(localeName));
    }
  },

  has(localeName, translationKey) {
    let translations = this.translationsFor(localeName);

    if (translations) {
      return translations.has(translationKey);
    }

    return false;
  },

  findTranslationByKey(localeNames, translationKey) {
    const locales = makeArray(localeNames);
    const len = locales.length;

    let i = 0;
    let translations, translation, key;

    for (; i < len; i++) {
      key = locales[i];
      translations = this.translationsFor(key);
      if (translations) {
        translation = translations.getValue(translationKey);
        if (translation) {
          return translation;
        }
      }
    }
  }
});

export default DefaultIntlAdapter;
