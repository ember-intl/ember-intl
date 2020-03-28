/**
 * Copyright 2015, Yahoo! Inc.
 * Copyrights licensed under the New BSD License. See the accompanying LICENSE file for terms.
 */

import EmberObject from '@ember/object';
import { assign } from '@ember/polyfills';
import EmptyObject from 'ember-intl/-private/utils/empty-object';
import flatten from 'ember-intl/-private/utils/flatten';

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

  addTranslations(translations) {
    assign(this.translations, flatten(translations));
  },

  find(key) {
    return this.translations[key];
  },

  has(key) {
    return hasOwnProperty.call(this.translations, key);
  },
});

export default TranslationModel;
