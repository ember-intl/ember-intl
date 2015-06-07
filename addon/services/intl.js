/**
 * Copyright 2015, Yahoo! Inc.
 * Copyrights licensed under the New BSD License. See the accompanying LICENSE file for terms.
 */

import Ember from 'ember';
import { IntlMessageFormat } from '../utils/data';
import createFormatCache from '../format-cache/memoizer';

var makeArray = Ember.makeArray;
var computed  = Ember.computed;
var observer  = Ember.observer;
var runOnce   = Ember.run.once;
var isEmpty   = Ember.isEmpty;
var get       = Ember.get;

function formatterProxy (formatType) {
    return function (value, options) {
        var formatter = this.container.lookup('ember-intl@formatter:format-' + formatType);

        if (options && typeof options.format === 'string') {
            var format = this.getFormat(formatType, options.format);
            options = Ember.$.extend(format, options);
        }

        return formatter.format.call(formatter, value, options);
    };
}

export default Ember.Service.extend(Ember.Evented, {
    locales:          null,
    getMessageFormat: null,
    adapterType:      '-intl-adapter',

    //formatMessage:    formatterProxy('message'),
    formatRelative:   formatterProxy('relative'),
    formatNumber:     formatterProxy('number'),
    formatTime:       formatterProxy('time'),
    formatDate:       formatterProxy('date'),

    adapter: computed('adapterType', function () {
        var adapterType = get(this, 'adapterType');
        var app         = this.container.lookup('application:main');

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

    localeChanged: observer('locales', function () {
        runOnce(this, this.notifyLocaleChanged);
    }),

    init() {
        this._super(...arguments);
        this.getMessageFormat = createFormatCache(IntlMessageFormat);
    },

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
        this.trigger('localesChanged');
    },

    formatMessage(message, values, options) {
        if (typeof message === 'function') {
            return message(values);
        }

        options = options || {};

        let locales = options.locales;
        let formats = options.formats || get(this, 'formats');

        if (isEmpty(locales)) {
            locales = get(this, 'locales');
        }

        if (typeof message === 'string') {
            message = this.getMessageFormat(message, locales, formats);
        }

        return message.format(values);
    },

    createLocale(locale, payload) {
        let name = 'ember-intl@translation:' + locale;
        let modelType = this.container.lookupFactory('ember-intl@model:translation');

        if (this.container.has(name)) {
            this.container.unregister(name);
        }

        this.container.register(name, modelType.extend(payload));
    },

    getFormat(formatType, format) {
        let formats = get(this, 'formats');

        if (formats && formatType && typeof format === 'string') {
            return get(formats, formatType + '.' + format) || {};
        }

        return {};
    },

    findLanguage(locale) {
        let result = this.get('adapter').findLanguage(locale);

        return Ember.RSVP.cast(result).then(function (localeInstance) {
            if (typeof localeInstance === 'undefined') {
                throw new Error('`locale` must be a string or a locale instance');
            }

            return localeInstance;
        });
    },

    findTranslation(key, locales) {
        locales = locales ? makeArray(locales) : makeArray(get(this, 'locales'));

        let translation = this.get('adapter').findTranslation(locales, key);

        if (typeof translation === 'undefined') {
            throw new Error('translation: `' + key + '` on locale(s): ' + locales.join(',') + ' was not found.');
        }

        return translation;
    }
});
