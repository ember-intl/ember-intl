import Ember from 'ember';
import computed from 'ember-new-computed';

var now        = new Date();
var yesterday  = new Date(now).setDate(now.getDate() - 1);

export default Ember.Controller.extend({
  intl:       Ember.inject.service(),
  locales:    Ember.A(['en-us', 'fr-fr', 'es-es']),
  num:        1000,
  yesterday:  yesterday,

  actions: {
      changeLocale(localeName) {
          this.set('intl.locale', localeName);
      }
  }
});
