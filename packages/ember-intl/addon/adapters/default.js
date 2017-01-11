/**
 * Copyright 2015, Yahoo! Inc.
 * Copyrights licensed under the New BSD License. See the accompanying LICENSE file for terms.
 */

import Ember from 'ember';
import Translation from '../models/translation';

const { assert, A:emberArray, getOwner } = Ember;

function normalize(fullName) {
  assert('Lookup name must be a string', typeof fullName === 'string');

  return fullName.toLocaleLowerCase();
}

const DefaultIntlAdapter = Ember.Object.extend({
  seen: null,
  owner: null,

  init() {
    this._super(...arguments);

    this.seen = emberArray();
    this.owner = getOwner(this);
  },

  translationsFor(localeName) {
    if (typeof localeName !== 'string') {
      throw new Error('locale name required for translation lookup');
    }

    const normalizedLocale = normalize(localeName);
    const Klass = this.owner._lookupFactory('model:ember-intl-translation') || Translation;
    const lookupName = `ember-intl@translation:${normalizedLocale}`;
    const exists = this.owner.hasRegistration(lookupName);

    if (!exists) {
      const ModelKlass = Klass.extend();

      Object.defineProperty(ModelKlass.proto(), 'localeName', {
        writable: false,
        enumerable: true,
        value: normalizedLocale
      });

      this.owner.register(lookupName, ModelKlass);
    }

    const model = this.owner.lookup(lookupName);

    if (!exists) {
      this.seen.pushObject(model);
    }

    return model;
  },

  has(localeName, translationKey) {
    const model = this.translationsFor(localeName);

    return model && model.has(translationKey);
  },

  findTranslationByKey(localeNames, translationKey) {
    const len = localeNames.length;
    let i = 0;

    for (; i < len; i++) {
      const locale = localeNames[i];
      const model = this.translationsFor(locale);

      if (model && model.has(translationKey)) {
        return model.getValue(translationKey);
      }
    }
  }
});

export default DefaultIntlAdapter;
