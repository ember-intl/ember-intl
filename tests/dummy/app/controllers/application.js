import Ember from 'ember';
import computedPolyfill from 'ember-new-computed';

export default Ember.Controller.extend({
    intl:      Ember.inject.service(),
    options:   ['en-US', 'fr-FR', 'es'],

    value: computedPolyfill('intl.locale', {
      get() {
        return this.get('intl.locale.firstObject') || this.get('intl.locale');
      },
      set(key, value) {
        this.set('intl.locale', value);
        return this.get('intl.locale.firstObject') || this.get('intl.locale');
      }
    })
});
