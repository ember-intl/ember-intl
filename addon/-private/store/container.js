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

  createTranslationModel(localeName) {
    const translationModel = Translation.create({
      localeName: localeName,
    });

    this._translations.set(localeName, translationModel);
    this.notifyPropertyChange('locales');

    return translationModel;
  },

  findTranslationModel(localeName) {
    return this._translations.get(localeName);
  },

  push(localeName, payload) {
    let translationModel = this.findTranslationModel(localeName);

    if (!translationModel) {
      translationModel = this.createTranslationModel(localeName);
    }

    translationModel.addTranslations(payload);
  },

  has(localeName, key) {
    const translationModel = this.findTranslationModel(localeName);

    if (translationModel) {
      return translationModel.has(key);
    }
  },

  _lookup(localeName, key) {
    const translationModel = this.findTranslationModel(localeName);

    if (translationModel && translationModel.has(key)) {
      return translationModel.find(key);
    }
  },

  lookupAst(localeName, key) {
    const translationResult = this._lookup(localeName, key);

    if (translationResult) {
      return translationResult.ast;
    }
  },

  lookup(localeName, key) {
    const translationResult = this._lookup(localeName, key);

    if (translationResult) {
      return translationResult.original;
    }
  },
});
