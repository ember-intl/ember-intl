/**
 * Copyright 2015, Yahoo! Inc.
 * Copyrights licensed under the New BSD License. See the accompanying LICENSE file for terms.
 */

import Ember from 'ember';
import computed from 'ember-new-computed';
import extend from '../utils/extend';
import Translation from '../models/translation';

const { assert, makeArray, observer, get, set, run, Service, Evented, Logger:emberLogger } = Ember;
const { once:runOnce } = run;
const { warn } = emberLogger;

function formatterProxy (formatType) {
    return function (value, options = {}) {
        const formatter = this.container.lookup(`ember-intl@formatter:format-${formatType}`);

        if (typeof options.format === 'string') {
            const format = this.getFormat(formatType, options.format);
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
            warn('`intl.locales` is deprecated in favor of `intl.locale`');
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
            const formats = this.container.lookupFactory('formats:main');
            if (Ember.Object.detect(formats)) {
                return formats.create();
            }
            return formats;
        }
    }),

    localeChanged: observer('locale', function () {
        runOnce(this, this.notifyLocaleChanged);
    }),

    addMessage() {
        warn('`addMessage` is deprecated in favor of `addTranslation`');
        return this.addTranslation(...arguments);
    },

    addMessages() {
        warn('`addMessages` is deprecated in favor of `addTranslations`');
        return this.addTranslations(...arguments);
    },

    exists(key) {
      const locale = this.get('locale');
      assert('Intl: Cannot check existance when locale is null', locale);
      return get(this, 'adapter').findTranslationByKey(locale, key);
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
        let container = this.container;
        const name = `ember-intl@translation:${locale}`;
        const instance = this.container.lookup('application:main') || {};

        if (instance.registry) {
            container = instance.registry;
        }

        if (container.has(name)) {
            container.unregister(name);
        }

        container.register(name, Translation.extend(payload));
    },

    getFormat(formatType, format) {
        const formats = get(this, 'formats');

        if (formats && formatType && typeof format === 'string') {
            return get(formats, `${formatType}.${format}`);
        }
    },

    translationsFor(locale) {
        const result = get(this, 'adapter').translationsFor(locale);

        return Ember.RSVP.cast(result).then(function (localeInstance) {
            if (typeof localeInstance === 'undefined') {
                throw new Error('\'locale\' must be a string or a locale instance');
            }

            return localeInstance;
        });
    },

    findTranslationByKey(key, locale) {
        const _locale = locale ? locale : get(this, 'locale');
        const translation = get(this, 'adapter').findTranslationByKey(_locale, key);

        if (typeof translation === 'undefined') {
            throw new Error(`translation: '${key}' on locale(s): '${locale.join(',')}' was not found.`);
        }

        return translation;
    }
});
