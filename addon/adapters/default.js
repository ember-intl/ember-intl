/**
 * Copyright 2015, Yahoo! Inc.
 * Copyrights licensed under the New BSD License. See the accompanying LICENSE file for terms.
 */

import { getOwner } from '@ember/application';
import { A as emberArray } from '@ember/array';
import Translation from '../models/translation';
import EmberObject, { get } from '@ember/object';
import { computed } from '@ember-decorators/object';

class DefaultAdapter extends EmberObject {
  /** @private **/
  _seen = null;

  /** @private **/
  @computed('_seen.[]')
  get locales() {
    return get(this, '_seen').map(l => l.localeName);
  }

  /** @private **/
  constructor() {
    super(...arguments);
    this._seen = emberArray();
  }

  /** @private **/
  lookupLocale(localeName) {
    return this._seen.findBy('localeName', localeName);
  }

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

    class ExtendedTranslation extends Klass {
      localeName = localeName;
    }

    owner.register(lookupName, ExtendedTranslation);
    model = owner.lookup(lookupName);
    this._seen.pushObject(model);

    return model;
  }

  /** @private **/
  has(localeName, translationKey) {
    const model = this.lookupLocale(localeName);

    return model && model.has(translationKey);
  }

  /** @private **/
  lookup(localeNames, translationKey) {
    for (let i = 0; i < localeNames.length; i++) {
      const localeName = localeNames[i];
      const model = this.lookupLocale(localeName);

      if (model && model.has(translationKey)) {
        return model.getValue(translationKey);
      }
    }
  }
}

export default DefaultAdapter;
