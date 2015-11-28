/**
 * Copyright 2015, Yahoo! Inc.
 * Copyrights licensed under the New BSD License. See the accompanying LICENSE file for terms.
 */

import Ember from 'ember';

const { get, set } = Ember;

const TranslationModel = Ember.Object.extend({
  addTranslation(key, value) {
    set(this, key, value);

    return value;
  },

  addTranslations(messageObject) {
    // shallow merge intentional
    for (let key in messageObject) {
      if (messageObject.hasOwnProperty(key) && typeof this[key] !== 'function') {
        this[key] = messageObject[key];
      }
    }
  },

  /**
   * Custom accessor hook that can be overridden.
   * This would enable consumers that have dot notated strings
   * to implement this function as `return this[key];`
   * @public
   */
  getValue(key) {
    return get(this, key);
  },

  has(key) {
    return typeof this.getValue(key) === 'string';
  }
});

export default TranslationModel;
