import Ember from 'ember';

const now = new Date();
const yesterday  = new Date(now).setDate(now.getDate() - 1);

export default Ember.Controller.extend({
  intl: Ember.inject.service(),
  locales: Ember.A(['en-us', 'fr-fr', 'es-es']),
  num: 1000,
  yesterday: yesterday,

  actions: {
    changeLocale(locale) {
      this.get('intl').setLocale(locale);
    }
  }
});
