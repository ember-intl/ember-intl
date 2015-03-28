import Ember from 'ember';

var now       = new Date();
var yesterday = now.setDate(now.getDate() - 1);

function computedNumber (number, options) {
    return Ember.computed('intl.locales', function () {
        return this.get('intl').formatNumber(number, options);
    });
}

export default Ember.Controller.extend({
    intl:      Ember.inject.service(),
    numType:   'currency',
    num:       1000,
    yesterday: yesterday,
    deadline:  Ember.computed.readOnly('yesterday'),
    now:       now,

    messages: {
        photos: '{name} took {numPhotos, plural,\n  =0 {no photos}\n  =1 {one photo}\n  other {# photos}\n} on {takenDate, date, long}.\n'
    },
    
    computedMessage: Ember.computed(function () {
        return 'product.info';
    }),

    incrementTime: Ember.on('init', function() {
        var self = this;

        setInterval(function() {
            Ember.run(function() {
                self.set('now', new Date());
                self.incrementProperty('num');
            });
        }, 200);
    })
});
