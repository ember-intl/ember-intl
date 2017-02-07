import TranslationModel from 'ember-intl/models/translation';

export default TranslationModel.extend({
  addTranslation(key, value) {
    this.translations[key] = value;
  },

  getValue(key) {
    return this.translations[key];
  }
});
