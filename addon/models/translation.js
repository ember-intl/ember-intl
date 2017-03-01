/**
 * Copyright 2015, Yahoo! Inc.
 * Copyrights licensed under the New BSD License. See the accompanying LICENSE file for terms.
 */

import Ember from 'ember';

const { get, set } = Ember;

const TranslationModel = Ember.Object.extend({
  localeName: null,

  init() {
    this._super();

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
    return get(this.translations, key);
  },

  /**
   * Determines if the translation model contains a key
   */
  has(key) {
    return typeof this.getValue(key) === 'string';
  }
});

export default TranslationModel;
