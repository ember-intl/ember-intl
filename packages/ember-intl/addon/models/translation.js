/**
 * Copyright 2015, Yahoo! Inc.
 * Copyrights licensed under the New BSD License. See the accompanying LICENSE file for terms.
 */

import Ember from 'ember';

const { get, set, deprecate } = Ember;

const TranslationModel = Ember.Object.extend({
  init() {
    this._super(...arguments);

    if (!this.content) {
      this.content = Object.create(null);
    }
  },

  add(key, value) {
    if (typeof key === 'object') {
      return this.addTranslations(key);
    }

    this.addTranslation(key, value);
  },
  
  remove(key) {
    delete this.content[key];
  },

  /**
   * Add a single translation
   */
  addTranslation(key, translation) {
    set(this.content, key, translation);
  },

  /**
   * Adds a translation hash
   */
  addTranslations(hash) {
    for (let key in hash) {
      if (hash.hasOwnProperty(key)) {
        this.addTranslation(key, hash[key]);
      }
    }
  },

  /**
   * Custom accessor hook that can be overridden.
   * This would enable consumers that have dot notated strings
   * to implement this function as `return this[key];`
   */
  getValue(key) {
    let translation = get(this.content, key);

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
