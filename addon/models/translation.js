/**
 * Copyright 2015, Yahoo! Inc.
 * Copyrights licensed under the New BSD License. See the accompanying LICENSE file for terms.
 */

import Ember from 'ember';

const { get, set } = Ember;

const TranslationModel = Ember.Object.extend({
  /**
   * Add a single translation
   */
  addTranslation(key, value) {
    if (typeof this[key] !== 'function') {
      set(this, key, value);
    }
  },

  /**
   * Adds a translation hash
   */
  addTranslations(messageObject) {
    for (let key in messageObject) {
      if (messageObject.hasOwnProperty(key)) {
        this.addTranslation(key, messageObject[key]);
      }
    }
  },

  /**
   * Custom accessor hook that can be overridden.
   * This would enable consumers that have dot notated strings
   * to implement this function as `return this[key];`
   */
  getValue(key) {
    return get(this, key);
  },

  /**
   * Determines if the translation model contains a key
   */
  has(key) {
    return typeof this.getValue(key) === 'string';
  }
});

export default TranslationModel;
