import Ember from 'ember';

export default Ember.Controller.extend({
  intl: Ember.inject.service(),
  locales: Ember.A(['en-us', 'fr-fr', 'es-es']),

  actions: {
    changeLocale(locale) {
      this.get('intl').setLocale(locale);
    }
  }
});
