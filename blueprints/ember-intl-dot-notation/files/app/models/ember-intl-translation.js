import TranslationModel from 'ember-intl/models/translation';

export default TranslationModel.extend({
  getValue(key) {
    return this.translations[key];
  }
});
