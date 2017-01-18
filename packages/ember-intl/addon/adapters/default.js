/**
 * Copyright 2015, Yahoo! Inc.
 * Copyrights licensed under the New BSD License. See the accompanying LICENSE file for terms.
 */

import Ember from 'ember';

const { A:emberArray, getOwner } = Ember;

const DefaultTranslationAdapter = Ember.Object.extend({
  _seen: null,

  init() {
    this._super(...arguments);
    this._seen = emberArray();
  },

  lookupLocale(localeName) {
    return this._seen.findBy('localeName', localeName);
  },

  localeFactory(localeName) {
    const owner = getOwner(this);
    const lookupName = `ember-intl@translation:${localeName}`;
    let model = owner.lookup(lookupName);

    if (model) {
      return model;
    }

    const Klass = owner._lookupFactory('model:ember-intl-translation') || owner._lookupFactory('ember-intl@model:translation');
    const ModelKlass = Klass.extend();

    Object.defineProperty(ModelKlass.proto(), 'localeName', {
      writable: false,
      enumerable: true,
      value: localeName
    });

    owner.register(lookupName, ModelKlass);
    model = owner.lookup(lookupName);
    this._seen.pushObject(model);

    return model;
  },

  locales() {
    return this._seen.map(l => l.localeName);
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
