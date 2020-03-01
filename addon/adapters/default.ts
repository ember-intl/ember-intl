/**
 * Copyright 2015, Yahoo! Inc.
 * Copyrights licensed under the New BSD License. See the accompanying LICENSE file for terms.
 */

import { getOwner } from '@ember/application';
import { A as emberArray } from '@ember/array';
import EmberObject, { computed, get } from '@ember/object';
import Translation from '../models/translation';

export default EmberObject.extend({
  _seen: null,

  /** @private **/
  locales: computed('_seen.[]', function() {
    return get(this, '_seen').map(l => l.localeName);
  }).readOnly(),

  /** @private **/
  init() {
    this._super();
    this._seen = emberArray();
  },

  /** @private **/
  lookupLocale(localeName) {
    return this._seen.findBy('localeName', localeName);
  },

  /** @private **/
  localeFactory(localeName) {
    const owner = getOwner(this);
    const lookupName = `ember-intl@translation:${localeName}`;
    let model = owner.lookup(lookupName);

    if (model) {
      return model;
    }

    let Klass;
    if (owner.hasRegistration('model:ember-intl-translation')) {
      Klass = owner.factoryFor('model:ember-intl-translation').class;
    } else {
      Klass = Translation;
    }

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

  /** @private **/
  has(localeName, translationKey) {
    const model = this.lookupLocale(localeName);

    return model && model.has(translationKey);
  },

  /** @private **/
  lookup(localeName, translationKey) {
    const model = this.lookupLocale(localeName);

    if (model && model.has(translationKey)) {
      return model.getValue(translationKey);
    }
  }
});
