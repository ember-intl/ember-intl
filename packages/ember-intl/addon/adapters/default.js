/**
 * Copyright 2015, Yahoo! Inc.
 * Copyrights licensed under the New BSD License. See the accompanying LICENSE file for terms.
 */

import Ember from 'ember';
import Translation from '../models/translation';

const { assert, getOwner } = Ember;

function normalize(fullName) {
  assert('Lookup name must be a string', typeof fullName === 'string');

  return fullName.toLocaleLowerCase();
}

const DefaultIntlAdapter = Ember.Object.extend({
  seen: null,
  owner: null,

  init() {
    this._super(...arguments);

    this.seen = Ember.A();
    this.owner = getOwner(this);
  },

  translationsFor(localeName) {
    if (typeof localeName !== 'string') {
      throw new Error('locale name required for translation lookup');
    }

    const Type = this.owner._lookupFactory('model:ember-intl-translation') || Translation;

    if (localeName && localeName instanceof Type) {
      return localeName;
    }

    const normalizedLocale = normalize(localeName);
    const lookupName = `ember-intl@translation:${normalizedLocale}`;
    const exists = this.owner.hasRegistration(lookupName);

    if (!exists) {
      const ModelType = Type.extend();

      Object.defineProperty(ModelType.proto(), 'localeName', {
        writable: false,
        enumerable: true,
        value: normalizedLocale
      });

      this.owner.register(lookupName, ModelType);
    }

    const model = this.owner.lookup(lookupName);

    if (!exists) {
      this.seen.pushObject(model);
    }

    return model;
  },

  has(localeName, translationKey) {
    const translations = this.translationsFor(localeName);

    if (translations) {
      return translations.has(translationKey);
    }

    return false;
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
