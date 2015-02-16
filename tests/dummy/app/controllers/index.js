import Ember from 'ember';

var now       = new Date();
var yesterday = now.setDate(now.getDate() - 1);

function computedNumber (number, options) {
    return Ember.computed('intl.locales', function () {
        return this.intl.formatNumber(number, options);
    });
}

export default Ember.Controller.extend({
    numType:   'currency',
    num:       1000,
    yesterday: yesterday,
    deadline:  Ember.computed.readOnly('yesterday'),
    now:       now,

    messages: {
        photos: '{name} took {numPhotos, plural,\n  =0 {no photos}\n  =1 {one photo}\n  other {# photos}\n} on {takenDate, date, long}.\n'
    },

    formatNumberPercent: computedNumber(400, { style: 'percent' }),
    formatNumberSimple:  computedNumber(400),
    formatNumberEuro:    computedNumber(400, 'EUR'),

    formatMessageExample: Ember.computed('intl.locales', function () {
        return this.intl.formatMessage(this.messages.photos, {
            name:      'Jason',
            numPhotos: 1400,
            takenDate: now
        });
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
