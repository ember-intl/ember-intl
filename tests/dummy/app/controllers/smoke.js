import Ember from 'ember';

var Controller = Ember.Controller;
var computed = Ember.computed;

var now       = new Date();
var yesterday = new Date(now).setDate(now.getDate() - 1);


export default Controller.extend({
  intl:       Ember.inject.service(),
  locales:    ['en-US', 'fr-FR', 'es'],
  num:        1000,
  yesterday:  yesterday,

  currentLocale: computed('intl.locales', function (key, value) {
    if (arguments.length === 2) {
      this.set('intl.locales', arguments[1]);
    }

    return this.get('intl.locales.firstObject') || this.get('intl.locales');
  })
});
