import Ember from 'ember';
import computed from 'ember-new-computed';

export default Ember.Controller.extend({
    intl:    Ember.inject.service(),
    options: Ember.A(['en-US', 'fr-FR', 'es']),

    actions: {
        changeLocale: function(localeName) {
            this.set('intl.locale', localeName);
        }
    },

    value: computed('intl.locale', {
        get() {
            return this.get('intl.locale.firstObject') || this.get('intl.locale');
        }
    })
});
