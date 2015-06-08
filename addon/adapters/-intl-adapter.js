import Ember from 'ember';
import Translation from '../models/translation';
import IntlGetResult from '../models/intl-get-result';

function normalize (fullName) {
    Ember.assert('Lookup name must be a string', typeof fullName === 'string');

    return fullName.toLowerCase();
}

export default Ember.Object.extend({
    findLanguage(localeName) {
        if (localeName instanceof Translation) {
            return localeName;
        }

        if (typeof localeName === 'string') {
            return this.container.lookup('ember-intl@translation:' + normalize(localeName));
        }
    },

    findTranslation(locale, translationKey) {
        let i = 0;
        let len = locale.length;
        let _locale, translation, key;

        for (; i < len; i++) {
            key    = locale[i];
            _locale = this.findLanguage(key);

            if (_locale) {
                translation = _locale.getValue(translationKey);

                if (typeof translation !== 'undefined') {
                    return new IntlGetResult(translation, key);
                }
            }
        }
    }
});
