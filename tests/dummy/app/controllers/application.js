import Ember from 'ember';

export default Ember.Controller.extend({
    options:   ['en-US', 'fr-FR', 'es'],

    value: Ember.computed('intl.locales', function (key, value) {
        if (arguments.length === 2) {
            this.intl.set('locales', arguments[1]);
        }

        return this.intl.get('locales.firstObject') || this.intl.get('locales');
    })
});
