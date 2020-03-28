/**
 * Copyright 2015, Yahoo! Inc.
 * Copyrights licensed under the New BSD License. See the accompanying LICENSE file for terms.
 */

import EmberObject from '@ember/object';
import { assign } from '@ember/polyfills';
import EmptyObject from 'ember-intl/-private/utils/empty-object';
import flatten from 'ember-intl/-private/utils/flatten';
import { parse } from 'intl-messageformat-parser';

/**
 * @private
 * @hide
 */
const TranslationModel = EmberObject.extend({
  localeName: null,

  init() {
    this._super();

    if (!this.translations) {
      this.translations = new EmptyObject();
    }
  },

  compile(translation) {
    return parse(translation);
  },

  addTranslations(translations) {
    const flatTranslations = flatten(translations);

    for (let key in flatTranslations) {
      let translation = flatTranslations[key];

      // If it's not a string, coerce it to one.
      if (typeof translation !== 'string') {
        translation = `${translation}`;
      }

      flatTranslations[key] = this.compile(translation);
    }

    assign(this.translations, flatTranslations);
  },

  find(key) {
    return this.translations[key];
  },

  has(key) {
    return hasOwnProperty.call(this.translations, key);
  },
});

export default TranslationModel;
