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

  getTranslationsForLocale(localeName) {
    return this._translations.get(localeName);
  },

  localeFactory(localeName) {
    if (this._translations.has(localeName)) {
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
    const translationObject = this.localeFactory(locale);

    translationObject.addTranslations(payload);
  },

  has(locale, key) {
    const translationObject = this.getTranslationsForLocale(locale);

    if (translationObject) {
      return translationObject.has(key);
    }
  },

  lookup(locale, key) {
    const translationObject = this.getTranslationsForLocale(locale);

    if (translationObject && translationObject.has(key)) {
      return translationObject.find(key);
    }
  },
});
