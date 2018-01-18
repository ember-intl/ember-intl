/**
 * Copyright 2015, Yahoo! Inc.
 * Copyrights licensed under the New BSD License. See the accompanying LICENSE file for terms.
 */

import { getOwner } from '@ember/application';
import { A as emberArray } from '@ember/array';
import Translation from '../models/translation';
import EmberObject, { computed } from '@ember/object';
import EmptyObject from '../utils/empty-object';

const DefaultTranslationAdapter = EmberObject.extend({
  init() {
    this._super(...arguments);
    this._seen = emberArray();
    this._owner = getOwner(this);
    this._cache = new EmptyObject();
    this._Factory = this._owner.factoryFor('model:ember-intl-translation');
  },

  /** @private **/
  _seen: null,

  /** @private **/
  _cache: null,

  /** @private **/
  _Factory: null,

  /** @private **/
  _owner: null,

  /** @private **/
  locales: computed('_seen.[]', function() {
    return this._seen.map(l => l.localeName);
  }).readOnly(),

  /** @private **/
  lookupLocale(localeName) {
    return this._cache[localeName];
  },

  /** @private **/
  localeFactory(localeName) {
    let model = this.lookupLocale(localeName);
    if (model) {
      return model;
    }

    return this.create(localeName);
  },

  create(localeName) {
    let model = (this._Factory || Translation).create({ localeName });
    this._cache[localeName] = model;
    this._seen.pushObject(model);

    return model;
  },

  /** @private **/
  has(localeName, translationKey) {
    let model = this.lookupLocale(localeName);

    return model && model.has(translationKey);
  },

  /** @private **/
  lookup(localeNames, translationKey) {
    for (let i = 0; i < localeNames.length; i++) {
      let localeName = localeNames[i];
      let model = this.lookupLocale(localeName);

      if (model && model.has(translationKey)) {
        return model.getValue(translationKey);
      }
    }
  },

  /** @private **/
  translationsFor(localeName) {
    return this.localeFactory(localeName);
  },

  /** @private **/
  findTranslationByKey(localeNames, translationKey) {
    return this.lookup(localeNames, translationKey);
  }
});

export default DefaultTranslationAdapter;
