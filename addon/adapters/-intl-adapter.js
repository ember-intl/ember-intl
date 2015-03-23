import Ember from 'ember';
import IntlGetResult from '../models/intl-get-result';
import Locale from '../models/locale';

function normalize (fullName) {
    Ember.assert('Lookup name must be a string', typeof fullName === 'string');

    return fullName.toLowerCase();
}

export default Ember.Object.extend({
    findLanguage: function (locale) {
        if (locale instanceof Locale) {
            return locale;
        }

        if (typeof locale === 'string') {
            return this.container.lookup('locale:' + normalize(locale));
        }
    },

    findTranslation: function (locales, translationKey) {
        var locale, translation, key;

        for (var i=0, len = locales.length; i < len; i++) {
            key = locales[i];
            locale = this.findLanguage(key);

            if (locale) {
                translation = locale.getValue(translationKey);

                if (typeof translation !== 'undefined') {
                    return new IntlGetResult(translation, key);
                }
            }
        }
    }
});
