/**
 * Copyright 2015, Yahoo! Inc.
 * Copyrights licensed under the New BSD License. See the accompanying LICENSE file for terms.
 */

import EmberObject, { computed } from '@ember/object';
import { getOwner } from '@ember/application';
import { TranslationModel } from '../models/translation';
import { A as emberArray } from '@ember/array';
import MutableEmberArray from '@ember/array/mutable';

declare module '../models/translation' {
  interface TranslationModel {
    localeName: string;
  }
}

class OverridableProps {
  _seen: any = null;

  locales = computed('_seen.[]', {
    get(this: IntlAdapterDefault) {
      return this._seen.map(l => l.localeName);
    }
  });
}

export default class IntlAdapterDefault extends EmberObject.extend(new OverridableProps()) {
  _seen: MutableEmberArray<TranslationModel> = emberArray();

  /** @private **/
  lookupLocale(localeName: string) {
    return this._seen.findBy('localeName', localeName);
  }

  /** @private **/
  localeFactory(localeName: string): TranslationModel {
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
      Klass = TranslationModel;
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
  }

  /** @private **/
  has(localeName: string, translationKey: string) {
    const model = this.lookupLocale(localeName);

    return model && model.has(translationKey);
  }

  /** @private **/
  lookup(localeName: string, translationKey: string): string | undefined {
    const model = this.lookupLocale(localeName);

    if (model && model.has(translationKey)) {
      return model.getValue(translationKey);
    }

    return undefined;
  }
}
