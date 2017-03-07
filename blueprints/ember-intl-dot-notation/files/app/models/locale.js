import TranslationModel from 'ember-intl/models/locale';

export default TranslationModel.extend({
  addTranslation(key, value) {
    this.translations[key] = value;
  },

  lookup(key) {
    return this.translations[key];
  }
});
