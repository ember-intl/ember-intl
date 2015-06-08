import Ember from 'ember';

export default Ember.Controller.extend({
    intl:      Ember.inject.service(),
    options:   ['en-US', 'fr-FR', 'es'],

    value: Ember.computed('intl.locale', function (key, value) {
        if (arguments.length === 2) {
            this.set('intl.locale', arguments[1]);
        }

        return this.get('intl.locale.firstObject') || this.get('intl.locale');
    })
});
