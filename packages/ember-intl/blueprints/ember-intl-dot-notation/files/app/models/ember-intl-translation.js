import TranslationModel from 'ember-intl/models/translation';

export default TranslationModel.extend({
  addTranslation(key, value) {
    this.content[key] = value;
  },

  getValue(key) {
    return this.content[key];
  }
});
