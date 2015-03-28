import Translation from 'ember-intl/models/translation';

export default Translation.extend({
    product: {
        info: '{product} will cost {price, number, EUR} if ordered by {deadline, date, time}',
        html: {
            info: '<strong>{product}</strong> will cost <em>{price, number, EUR}</em> if ordered by {deadline, date, time}'
        },
        title: 'Hello world!'
    }
});
