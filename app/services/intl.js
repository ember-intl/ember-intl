/**
 * Copyright 2015, Yahoo! Inc.
 * Copyrights licensed under the New BSD License. See the accompanying LICENSE file for terms.
 */

import Ember from 'ember';
import Locale from 'ember-intl/models/locale';
import createFormatCache from 'ember-intl/format-cache/memoizer';
import { IntlRelativeFormat, IntlMessageFormat } from 'ember-intl/utils/data';

var makeArray = Ember.makeArray;
var get       = Ember.get;
var on        = Ember.on;
var computed  = Ember.computed;
var observer  = Ember.observer;
var isEmpty   = Ember.isEmpty;
var isPresent = Ember.isPresent;
var run       = Ember.run;

function assertIsDate (date, errMsg) {
    Ember.assert(errMsg, isFinite(date));
}

export default Ember.Service.extend(Ember.Evented, {
    locales:           null,
    defaultLocale:     null,

    getDateTimeFormat: null,
    getRelativeFormat: null,
    getMessageFormat:  null,
    getNumberFormat:   null,

    setupMemoizers: on('init', function () {
        this.setProperties({
            getDateTimeFormat: createFormatCache(Intl.DateTimeFormat),
            getRelativeFormat: createFormatCache(IntlRelativeFormat),
            getNumberFormat:   createFormatCache(Intl.NumberFormat),
            getMessageFormat:  createFormatCache(IntlMessageFormat)
        });
    }),

    current: computed('locales', 'defaultLocale', function () {
        var locales       = makeArray(get(this, 'locales'));
        var defaultLocale = get(this, 'defaultLocale');

        if (isPresent(defaultLocale) && locales.indexOf(defaultLocale) === -1) {
            locales.push(defaultLocale);
        }

        return locales;
    }).readOnly(),

    formats: computed(function () {
        return this.container.lookup('formats:main', {
            instantiate: false
        }) || {};
    }).readOnly(),

    localeChanged: observer('current', function () {
        run.once(this, this.notifyLocaleChanged);
    }),

    addMessage: function (locale, key, value) {
        var localeInstance = this._getLocaleInstance(locale);

        return localeInstance.addMessage(key, value);
    },

    addMessages: function (locale, messageObject) {
        var localeInstance = this._getLocaleInstance(locale);

        return localeInstance.addMessages(messageObject);
    },

    notifyLocaleChanged: function () {
        this.trigger('localesChanged');
    },

    formatRelative: function (date, options) {
        date = new Date(date);
        assertIsDate(date, 'A date or timestamp must be provided to formatRelative()');

        return this._format('relative', date, options);
    },

    formatMessage: function (message, values, options) {
        // When `message` is a function, assume it's an IntlMessageFormat
        // instance's `format()` method passed by reference, and call it. This
        // is possible because its `this` will be pre-bound to the instance.
        if (typeof message === 'function') {
            return message(values);
        }

        options = options || {};

        var locales = makeArray(options.locales);
        var formats = options.formats || get(this, 'formats');

        if (isEmpty(locales)) {
            locales = get(this, 'current');
        }

        if (typeof message === 'string') {
            message = this.getMessageFormat(message, locales, formats);
        }

        return message.format(values);
    },

    formatTime: function (date, options) {
        date = new Date(date);
        assertIsDate(date, 'A date or timestamp must be provided to formatTime()');

        return this._format('time', date, options);
    },

    formatDate: function (date, options) {
        date = new Date(date);
        assertIsDate(date, 'A date or timestamp must be provided to formatDate()');

        return this._format('date', date, options);
    },

    formatNumber: function (num, options) {
        return this._format('number', num, options);
    },

    _format: function (type, value, options) {
        options = options || {};

        var locales = makeArray(options.locales);
        var formats = get(this, 'formats');

        if (isEmpty(locales)) {
            locales = get(this, 'current');
        }

        if (typeof options.formats === 'string') {
            options = get(this, 'formats.' + type + '.' + options.formats);
        } else if (typeof options.formats === 'object') {
            options = options.formats;
        }

        if (typeof options === 'string') {
            try {
                options = formats[type][options];
            } catch (e) {
                options = undefined;
            } finally {
                if (options === undefined) {
                    throw new ReferenceError('No ' + type + ' format named: ' + options);
                }
            }
        }

        switch (type) {
            case 'date':
            case 'time':
                return this.getDateTimeFormat(locales, options).format(value);
            case 'number':
                return this.getNumberFormat(locales, options).format(value);
            case 'relative':
                return this.getRelativeFormat(locales, options).format(value);
            default:
                throw new Error('Unrecognized simple format type: ' + type);
        }
    },

    _getLocaleInstance: function (locale) {
        if (locale instanceof Locale) {
            return locale;
        }

        if (typeof locale === 'string') {
            return this.container.lookup('locale:' + localeId.toLowerCase());
        }

        throw new Error('`locale` must be a string or a locale instance');
    }
});
