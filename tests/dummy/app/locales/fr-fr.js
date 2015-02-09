import Locale from 'ember-intl/models/locale';

export default Locale.extend({
    messages: {
        product: {
            info: '{product} coûtera {price, number, EUR} si triés par {deadline, date, time}',
            html: {
                info: '<strong>{product}</strong> coûtera <em>{price, number, EUR}</em> si triés par {deadline, date, time}'
            }
        }
    }
});
