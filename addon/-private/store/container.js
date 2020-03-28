import EmberObject, { computed } from '@ember/object';
import Translation from './translation';

/**
 * @private
 * @hide
 */
export default EmberObject.extend({
  locales: computed('_translations', function () {
    return Array.from(this._translations.keys());
  }).readOnly(),

  init() {
    this._super();
    this._translations = new Map();
  },

  lookupTranslationObject(localeName, autogenerate = true) {
    if (this._translations.has(localeName) || !autogenerate) {
      return this._translations.get(localeName);
    }

    const translationObject = Translation.create({
      localeName: localeName,
    });

    this._translations.set(localeName, translationObject);
    this.notifyPropertyChange('locales');

    return translationObject;
  },

  push(locale, payload) {
    this.lookupTranslationObject(locale, true).addTranslations(payload);
  },

  has(locale, key) {
    const translationObject = this.lookupTranslationObject(locale, false);

    if (translationObject) {
      return translationObject.has(key);
    }
  },

  lookup(locale, key) {
    const translationObject = this.lookupTranslationObject(locale, false);

    if (translationObject && translationObject.has(key)) {
      return translationObject.find(key);
    }
  },
});
