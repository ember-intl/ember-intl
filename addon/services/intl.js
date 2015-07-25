/**
 * Copyright 2015, Yahoo! Inc.
 * Copyrights licensed under the New BSD License. See the accompanying LICENSE file for terms.
 */

import Ember from 'ember';
import computed from 'ember-new-computed';
import extend from '../utils/extend';
import Translation from '../models/translation';

const { makeArray, observer, get, set, run, Service, Evented, Logger } = Ember;
const { once:runOnce } = run;

function formatterProxy (formatType) {
    return function (value, options = {}) {
        let formatter = this.container.lookup(`ember-intl@formatter:format-${formatType}`);

        if (typeof options.format === 'string') {
            let format = this.getFormat(formatType, options.format);
            options = extend(format, options);
        }

        if (!options.locale) {
            options.locale = get(this, 'locale');
        }

        return formatter.format(value, options);
    };
}

export default Service.extend(Evented, {
    locale: null,

    locales: computed('locale', {
        get() {
            return get(this, 'locale');
        },
        set(key, value) {
            Logger.warn('`intl.locales` is deprecated in favor of `intl.locale`');
            set(this, 'locale', makeArray(value));
            return value;
        }
    }),

    formatRelative: formatterProxy('relative'),
    formatMessage: formatterProxy('message'),
    formatNumber: formatterProxy('number'),
    formatTime: formatterProxy('time'),
    formatDate: formatterProxy('date'),

    adapter: computed({
        get() {
            return this.container.lookup('ember-intl@adapter:-intl-adapter');
        }
    }),

    formats: computed({
        get() {
            return this.container.lookup('formats:main', {
                instantiate: false
            }) || {};
        }
    }),

    localeChanged: observer('locale', function () {
        runOnce(this, this.notifyLocaleChanged);
    }),

    addMessage() {
        Logger.warn('`addMessage` is deprecated in favor of `addTranslation`');
        return this.addTranslation(...arguments);
    },

    addMessages() {
        Logger.warn('`addMessages` is deprecated in favor of `addTranslations`');
        return this.addTranslations(...arguments);
    },

    addTranslation(locale, key, value) {
        return this.translationsFor(locale).then((localeInstance) => {
            return localeInstance.addMessage(key, value);
        });
    },

    addTranslations(locale, payload) {
        return this.translationsFor(locale).then((localeInstance) => {
            return localeInstance.addMessages(payload);
        });
    },

    notifyLocaleChanged() {
        this.trigger('localeChanged');
    },

    createLocale(locale, payload) {
        let name = `ember-intl@translation:${locale}`;
        let container = this.container;
        let instance = container.lookup('application:main') || {};

        if (instance.registry) {
            container = instance.registry;
        }

        if (container.has(name)) {
            container.unregister(name);
        }

        container.register(name, Translation.extend(payload));
    },

    getFormat(formatType, format) {
        let formats = get(this, 'formats');

        if (formats && formatType && typeof format === 'string') {
            return get(formats, `${formatType}.${format}`) || {};
        }

        return {};
    },

    translationsFor(locale) {
        let result = get(this, 'adapter').translationsFor(locale);

        return Ember.RSVP.cast(result).then(function (localeInstance) {
            if (typeof localeInstance === 'undefined') {
                throw new Error('\'locale\' must be a string or a locale instance');
            }

            return localeInstance;
        });
    },

    findTranslationByKey(key, locale) {
        locale = locale ? makeArray(locale) : makeArray(get(this, 'locale'));
        let translation = get(this, 'adapter').findTranslationByKey(locale, key);

        if (typeof translation === 'undefined') {
            throw new Error(`translation: '${key}' on locale(s): '${locale.join(',')}' was not found.`);
        }

        return translation;
    }
});
