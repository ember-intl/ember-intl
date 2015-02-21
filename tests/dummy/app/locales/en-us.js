import Locale from 'ember-intl/models/locale';

export default Locale.extend({
    messages: {
        product: {
            info: '{product} will cost {price, number, EUR} if ordered by {deadline, date, time}',
            html: {
                info: '<strong>{product}</strong> will cost <em>{price, number, EUR}</em> if ordered by {deadline, date, time}'
            },
            title: 'Hello world!'
        }
    }
});
