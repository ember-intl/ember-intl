import Translation from 'ember-intl/models/translation';

export default Translation.extend({
    product: {
        info: '{product} coûtera {price, number, EUR} si triés par {deadline, date, time}',
        html: {
            info: '<strong>{product}</strong> coûtera <em>{price, number, EUR}</em> si triés par {deadline, date, time}'
        }
    }
});
