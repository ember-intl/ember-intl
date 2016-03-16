import TranslationModel from 'ember-intl/models/translation';

export default TranslationModel.extend({
  addTranslation(key, value) {
    if (typeof this[key] !== 'function') {
      this[key] = value;
    }
  },

  getValue(key) {
    return this[key];
  }
});
