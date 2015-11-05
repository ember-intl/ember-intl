/**
 * Copyright 2015, Yahoo! Inc.
 * Copyrights licensed under the New BSD License. See the accompanying LICENSE file for terms.
 */

import Ember from 'ember';

const { get, set, Logger:logger } = Ember;

const TranslationModel = Ember.Object.extend({
  addTranslation(key, value) {
    set(this, key, value);

    return value;
  },

  addTranslations(messageObject) {
    const messages = this;

    // shallow merge intentional
    for (let key in messageObject) {
      if (messageObject.hasOwnProperty(key)) {
        messages[key] = messageObject[key];
      }
    }

    return messages;
  },

  addMessage(...args) {
    logger.warn('`addMessage` is deprecated in favor of `addTranslation`');

    return this.addTranslation(...args);
  },

  addMessages(...args) {
    logger.warn('`addMessages` is deprecated in favor of `addTranslations`');

    return this.addTranslations(...args);
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
