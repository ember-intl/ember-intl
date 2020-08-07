/**
 * Copyright 2015, Yahoo! Inc.
 * Copyrights licensed under the New BSD License. See the accompanying LICENSE file for terms.
 */

import EmberObject from '@ember/object';
import EmptyObject from 'ember-intl/-private/utils/empty-object';
import flatten from 'ember-intl/-private/utils/flatten';
import parse from 'ember-intl/-private/utils/parse';

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

    if (!this.asts) {
      this.asts = new EmptyObject();
    }
  },

  addTranslations(translations) {
    const flatTranslations = flatten(translations);

    for (const key in flatTranslations) {
      let translation = flatTranslations[key];

      // If it's not a string, coerce it to one.
      if (typeof translation !== 'string') {
        translation = `${translation}`;
      }

      this.translations[key] = translation;
      this.asts[key] = parse(translation);
    }
  },

  find(key) {
    if (this.has(key)) {
      return {
        ast: this.asts[key],
        original: this.translations[key],
      };
    }
  },

  has(key) {
    return hasOwnProperty.call(this.translations, key);
  },
});

export default TranslationModel;
