import Ember from 'ember';
import computed from 'ember-new-computed';

export default Ember.Controller.extend({
    intl:    Ember.inject.service(),
    locales: Ember.A(['en-US', 'fr-FR', 'es']),

    actions: {
        changeLocale(localeName) {
            this.set('intl.locale', localeName);
        }
    }
});
