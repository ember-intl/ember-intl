/**
 * Copyright 2015, Yahoo! Inc.
 * Copyrights licensed under the New BSD License. See the accompanying LICENSE file for terms.
 */

import Ember from 'ember';

const { computed, get, A:emberArray, getOwner } = Ember;

const DefaultTranslationAdapter = Ember.Object.extend({
  /* private */
  _seen: null,

  /* private */
  _locales: computed.mapBy('_seen', 'localeName'),

  init() {
    this._super();

    const owner = getOwner(this);
    this._seen = emberArray();
    this._map = Object.create(null);
    this._modelFactory = owner.factoryFor('model:ember-intl-translation') || owner.factoryFor('ember-intl@model:translation');
  },

  /* private */
  localeFactory(localeName) {
    let model = this.lookupLocale(localeName);

    if (!model) {
      model = this._map[localeName] = this._modelFactory.create({ localeName });
      this._seen.pushObject(model);
    }

    return model;
  },

  /* private */
  locales() {
    return get(this, '_locales');
  },

  /* private */
  has(localeName, translationKey) {
    const model = this.lookupLocale(localeName);

    return model && model.has(translationKey);
  },

  /* private */
  lookupLocale(localeName) {
    return this._map[localeName];
  },

  /* private */
  lookup(localeNames, translationKey) {
    for (let i=0; i<localeNames.length; i++) {
      const localeName = localeNames[i];
      const model = this.lookupLocale(localeName);

      if (model) {
        const translation = model.lookup(translationKey);

        if (translation) {
          return translation;
        }
      }
    }
  }
});

export default DefaultTranslationAdapter;
