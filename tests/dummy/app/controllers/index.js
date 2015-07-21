import Ember from 'ember';
import computed from 'ember-new-computed';

const { get, set, Controller, inject, on, run } = Ember;

let now       = new Date();
let yesterday = now.setDate(now.getDate() - 1);

function computedNumber (number, options) {
    return computed('intl.locale', function () {
        return get(this, 'intl').formatNumber(number, options);
    });
}

export default Controller.extend({
    intl:      inject.service(),
    numType:   'currency',
    num:       1000,
    yesterday: yesterday,
    deadline:  computed.readOnly('yesterday'),
    now:       now,

    messages: {
        photos: '{name} took {numPhotos, plural,\n  =0 {no photos}\n  =1 {one photo}\n  other {# photos}\n} on {takenDate, date, long}.\n'
    },

    computedMessage: computed({
        get() {
            return 'product.info';
        }
    }),

    incrementTime: on('init', function() {
        setInterval(() => {
            run(() => {
                set(this, 'now', new Date());
                this.incrementProperty('num');
            });
        }, 200);
    })
});
