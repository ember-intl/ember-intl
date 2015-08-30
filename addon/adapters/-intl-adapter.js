/**
 * Copyright 2015, Yahoo! Inc.
 * Copyrights licensed under the New BSD License. See the accompanying LICENSE file for terms.
 */

import Ember from 'ember';
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

    if (typeof localeName === 'string') {
      return this.container.lookup('ember-intl@translation:' + normalize(localeName));
    }
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
