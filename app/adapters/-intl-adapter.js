import Ember from 'ember';
import Locale from 'ember-intl/models/locale';
import IntlAdapter from 'ember-intl/adapter';

function normalize (fullName) {
    Ember.assert('Lookup name must be a string', typeof fullName === 'string');

    return fullName.toLowerCase();
}

export default IntlAdapter.extend({
    findLocale: function (locale) {
        if (locale instanceof Locale) {
            return locale;
        }

        if (typeof locale === 'string') {
            return this.container.lookup('locale:' + locale.toLowerCase());
        }
    },

    findTranslation: function (locales, key) {
        var container = this.container;
        var locale, value;

        for (var i=0, len = locales.length; i < len; i++) {
            locale = container.lookup('locale:' + normalize(locales[i]));

            if (locale) {
                value = locale.getValue(key);

                if (typeof value !== 'undefined') {
                    return value;
                }
            }
        }
    }
});
