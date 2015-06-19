import Ember from 'ember';
import computed from 'ember-new-computed';

export default Ember.Controller.extend({
    intl:    Ember.inject.service(),
    locales: Ember.A(['en-US', 'fr-FR', 'es']),

    actions: {
        changeLocale: function(localeName) {
            this.set('intl.locale', localeName);
        }
    },

    currentLocale: computed('intl.locale', {
        get() {
            return this.get('intl.locale.firstObject') || this.get('intl.locale');
        }
    })
});
