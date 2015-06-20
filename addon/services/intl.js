/**
 * Copyright 2015, Yahoo! Inc.
 * Copyrights licensed under the New BSD License. See the accompanying LICENSE file for terms.
 */

import Ember from 'ember';
import computed from 'ember-new-computed';

var makeArray = Ember.makeArray;
var observer = Ember.observer;
var runOnce = Ember.run.once;
var extend = Ember.$.extend;
var get = Ember.get;

function formatterProxy (formatType) {
    return function (value, options) {
        var formatter = this.container.lookup(`ember-intl@formatter:format-${formatType}`);
        if (options && typeof options.format === 'string') {
            var format = this.getFormat(formatType, options.format);
            options = extend(format, options);
        }

        return formatter.format.call(formatter, value, options);
    };
}

export default Ember.Service.extend(Ember.Evented, {
    locale: null,

    locales: computed({
        get() {
          return this.get('locale');
        },
        set(key, value) {
          Ember.Logger.warn('`intl.locales` is deprecated in favor of `intl.locale`');
          this.set('locale', Ember.makeArray(value));
          return value;
        }
    }),

    adapterType: '-intl-adapter',

    formatRelative: formatterProxy('relative'),
    formatMessage: formatterProxy('message'),
    formatNumber: formatterProxy('number'),
    formatTime: formatterProxy('time'),
    formatDate: formatterProxy('date'),

    adapter: computed('adapterType', function () {
        let adapterType = get(this, 'adapterType');
        let app = this.container.lookup('application:main');

        // app can be undefined unit testing
        if (app && app.IntlAdapter) {
            return app.IntlAdapter.create({
                container: this.container
            });
        }

        if (typeof adapterType === 'string') {
            return this.container.lookup('adapter:' + adapterType);
        }
    }).readOnly(),

    formats: computed(function () {
        return this.container.lookup('formats:main', {
            instantiate: false
        }) || {};
    }).readOnly(),

    localeChanged: observer('locale', function () {
        runOnce(this, this.notifyLocaleChanged);
    }),

    addMessage(locale, key, value) {
        return this.findLanguage(locale).then(function (localeInstance) {
            return localeInstance.addMessage(key, value);
        });
    },

    addMessages(locale, messageObject) {
        return this.findLanguage(locale).then(function (localeInstance) {
            return localeInstance.addMessages(messageObject);
        });
    },

    notifyLocaleChanged() {
        this.trigger('localeChanged');
    },

    createLocale(instance, locale, payload) {
        let name = `ember-intl@translation:${locale}`;
        let modelType = instance.container.lookupFactory('ember-intl@model:translation');
        let container = instance.registry || instance.container;

        if (container.has(name)) {
          container.unregister(name);
        }

        container.register(name, modelType.extend(payload));
    },

    getFormat(formatType, format) {
        let formats = get(this, 'formats');

        if (formats && formatType && typeof format === 'string') {
            return get(formats, `${formatType}.${format}`) || {};
        }

        return {};
    },

    findLanguage(locale) {
        let result = this.get('adapter').findLanguage(locale);

        return Ember.RSVP.cast(result).then(function (localeInstance) {
            if (typeof localeInstance === 'undefined') {
                throw new Error('\'locale\' must be a string or a locale instance');
            }

            return localeInstance;
        });
    },

    findTranslation(key, locale) {
        locale = locale ? makeArray(locale) : makeArray(get(this, 'locale'));

        let translation = this.get('adapter').findTranslation(locale, key);

        if (typeof translation === 'undefined') {
            throw new Error(`translation: '${key}' on locale(s): '${locale.join(',')}' was not found.`);
        }

        return translation;
    }
});
