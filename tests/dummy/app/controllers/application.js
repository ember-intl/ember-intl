import Ember from 'ember';
import computed from 'ember-new-computed';

export default Ember.Controller.extend({
    intl:    Ember.inject.service(),
    options: Ember.A(['en-US', 'fr-FR', 'es']),

    value: computed('intl.locale', {
      get() {
        return this.get('intl.locale.firstObject') || this.get('intl.locale');
      },
      set(key, value) {
        this.set('intl.locale', value);
        return this.get('intl.locale.firstObject') || this.get('intl.locale');
      }
    })
});
