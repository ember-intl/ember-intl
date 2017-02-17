/**
 * Copyright 2015, Yahoo! Inc.
 * Copyrights licensed under the New BSD License. See the accompanying LICENSE file for terms.
 */

import Ember from 'ember';

const { get, set } = Ember;

const TranslationModel = Ember.ObjectProxy.extend({
  localeName: null,

  init() {
    this._super();

    if (!this.content) {
      this.content = Object.create(null);
    }
  },

  addTranslation(key, value) {
    set(this.content, key, value);
  },

  addTranslations(translationsObject) {
    for (let key in translationsObject) {
      this.addTranslation(key, translationsObject[key]);
    }
  },

  lookup(key) {
    return get(this.content, key);
  },

  has(key) {
    return typeof this.lookup(key) === 'string';
  }
});

export default TranslationModel;
