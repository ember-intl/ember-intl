/**
 * Copyright 2015, Yahoo! Inc.
 * Copyrights licensed under the New BSD License. See the accompanying LICENSE file for terms.
 */

import Ember from 'ember';

const { get, set, deprecate } = Ember;

const TranslationModel = Ember.Object.extend({
  init() {
    this._super(...arguments);

    if (!this.translations) {
      this.translations = Object.create(null);
    }
  },

  /**
   * Add a single translation
   */
  addTranslation(key, value) {
    set(this.translations, key, value);
  },

  /**
   * Adds a translation hash
   */
  addTranslations(translationsObject) {
    for (let key in translationsObject) {
      this.addTranslation(key, translationsObject[key]);
    }
  },

  /**
   * Custom accessor hook that can be overridden.
   * This would enable consumers that have dot notated strings
   * to implement this function as `return this[key];`
   */
  getValue(key) {
    let translation = get(this.translations, key);

    if (typeof translation === 'string') {
      return translation;
    }

    translation = get(this, key);

    if (typeof translation === 'string') {
      deprecate('[ember-intl] translations should be added via the `addTranslations`/`addTranslation` API.', false, {
        id: 'ember-intl-add-translation'
      });

      return translation;
    }
  },

  /**
   * Determines if the translation model contains a key
   */
  has(key) {
    return typeof this.getValue(key) === 'string';
  }
});

export default TranslationModel;
