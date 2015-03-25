import Ember from 'ember';

export default Ember.Controller.extend({
    intl:      Ember.inject.service(),
    options:   ['en-US', 'fr-FR', 'es'],

    value: Ember.computed('intl.locales', function (key, value) {
        if (arguments.length === 2) {
            this.set('intl.locales', arguments[1]);
        }

        return this.get('intl.locales.firstObject') || this.get('intl.locales');
    })
});
