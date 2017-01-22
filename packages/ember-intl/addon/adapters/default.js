/**
 * Copyright 2015, Yahoo! Inc.
 * Copyrights licensed under the New BSD License. See the accompanying LICENSE file for terms.
 */

import Ember from 'ember';

const { A:emberArray, get, computed, getOwner } = Ember;

const DefaultTranslationAdapter = Ember.Object.extend({
  _seen: null,
  _locales: computed.mapBy('_seen', 'localeName'),

  init() {
    this._super(...arguments);

    const owner = getOwner(this);
    this._seen = emberArray();
    this._map = Object.create(null);
    this.Model = owner._lookupFactory('model:ember-intl-translation') || owner._lookupFactory('ember-intl@model:translation');
  },

  lookupLocale(localeName) {
    return this._map[localeName];
  },

  localeFactory(localeName) {
    let model = this.lookupLocale(localeName);

    if (!model) {
      model = this._map[localeName] = this.Model.create({ localeName });
      this._seen.pushObject(model);
    }

    return model;
  },

  locales() {
    return get(this, '_locales');
  },

  has(localeName, translationKey) {
    const model = this.lookupLocale(localeName);

    return model && model.has(translationKey);
  },

  lookup(localeNames, translationKey) {
    for (let i=0; i<localeNames.length; i++) {
      const localeName = localeNames[i];
      const model = this.lookupLocale(localeName);

      if (model && model.has(translationKey)) {
        return model.getValue(translationKey);
      }
    }
  }
});

export default DefaultTranslationAdapter;
