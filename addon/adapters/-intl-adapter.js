import Ember from 'ember';
import Translation from '../models/translation';

function normalize (fullName) {
    Ember.assert('Lookup name must be a string', typeof fullName === 'string');
    return fullName.toLowerCase();
}

export default Ember.Object.extend({
    translationsFor(localeName) {
        if (localeName && localeName instanceof Translation) {
            return localeName;
        }

        if (typeof localeName === 'string') {
            return this.container.lookup('ember-intl@translation:' + normalize(localeName));
        }
    },

    findTranslationByKey(localeNames, translationKey) {
        var locales = Ember.makeArray(localeNames);
        let i = 0;
        let len = locales.length;
        let translations, translation, key;

        for (; i < len; i++) {
            key = locales[i];
            translations = this.translationsFor(key);
            if (translations) {
                translation = translations.getValue(translationKey);
                if (translation) {
                    return translation;
                }
            }
        }
    }
});
