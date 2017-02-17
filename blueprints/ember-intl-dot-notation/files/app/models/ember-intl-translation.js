import Ember from 'ember';
import TranslationModel from 'ember-intl/models/translation';

const { get, set } = Ember;

export default TranslationModel.extend({
  addTranslation(key, value) {
    set(this.content, key, value);
  },

  lookup(key) {
    return get(this.content, key);
  }
});
