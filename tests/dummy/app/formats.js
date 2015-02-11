import Ember from 'ember';

export default {
    date: {
        'time-style': {
            hour:   'numeric',
            minute: 'numeric',
            second: 'numeric'
        }
    },
    number: {
        currency: {
            style: 'currency',
            minimumFractionDigits: 2
        },
        EUR: { style: 'currency', currency: 'EUR' },
        USD: { style: 'currency', currency: 'USD' },
        JPY: { style: 'currency', currency: 'JPY' }
    },
    time: {
        hhmmss: {
            hour:   'numeric',
            minute: 'numeric',
            second: 'numeric'
        }
    }
};
