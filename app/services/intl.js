/**
 * Copyright 2015, Yahoo! Inc.
 * Copyrights licensed under the New BSD License. See the accompanying LICENSE file for terms.
 */

import Ember from 'ember';
import { IntlRelativeFormat, IntlMessageFormat } from 'ember-intl/utils/data';
import createFormatCache from 'ember-intl/format-cache/memoizer';
import IntlGetResult from 'ember-intl/models/intl-get-result';

var ServiceKlass = Ember.Service || Ember.Controller;
var makeArray    = Ember.makeArray;
var get          = Ember.get;
var on           = Ember.on;
var computed     = Ember.computed;
var observer     = Ember.observer;
var isEmpty      = Ember.isEmpty;
var isPresent    = Ember.isPresent;
var runOnce      = Ember.run.once;

function assertIsDate (date, errMsg) {
    Ember.assert(errMsg, isFinite(date));
}

export default ServiceKlass.extend(Ember.Evented, {
    locales:           null,
    defaultLocale:     null,

    getDateTimeFormat: null,
    getRelativeFormat: null,
    getMessageFormat:  null,
    getNumberFormat:   null,

    adapterType:       '-intl-adapter',

    setupMemoizers: on('init', function () {
        this.setProperties({
            getDateTimeFormat: createFormatCache(Intl.DateTimeFormat),
            getRelativeFormat: createFormatCache(IntlRelativeFormat),
            getNumberFormat:   createFormatCache(Intl.NumberFormat),
            getMessageFormat:  createFormatCache(IntlMessageFormat)
        });
    }),

    adapter: computed('adapterType', function () {
        var adapterType = get(this, 'adapterType');
        var app = this.container.lookup('application:main');

        if (app.IntlAdapter) {
            return app.IntlAdapter.create({
                container: this.container
            });
        } else if (typeof adapterType === 'string'){
            return this.container.lookup('adapter:' + adapterType);
        }
    }).readOnly(),

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
        runOnce(this, this.notifyLocaleChanged);
    }),

    addMessage: function (locale, key, value) {
        return this._getLocaleInstance(locale).then(function (localeInstance) {
            return localeInstance.addMessage(key, value);
        });
    },

    addMessages: function (locale, messageObject) {
        return this._getLocaleInstance(locale).then(function (localeInstance) {
            return localeInstance.addMessages(messageObject);
        });
    },

    notifyLocaleChanged: function () {
        this.trigger('localesChanged');
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

    formatTime: function (date, formatOptions, options) {
        date = new Date(date);
        assertIsDate(date, 'A date or timestamp must be provided to formatTime()');

        return this._format('time', date, formatOptions, options);
    },

    formatRelative: function (date, formatOptions, options) {
        date = new Date(date);
        assertIsDate(date, 'A date or timestamp must be provided to formatRelative()');

        return this._format('relative', date, formatOptions, options);
    },

    formatDate: function (date, formatOptions, options) {
        date = new Date(date);
        assertIsDate(date, 'A date or timestamp must be provided to formatDate()');

        return this._format('date', date, formatOptions, options);
    },

    formatNumber: function (num, formatOptions, options) {
        return this._format('number', num, formatOptions, options);
    },

    _format: function (type, value, formatOptions, helperOptions) {
        if (!helperOptions) {
            helperOptions = formatOptions || {};
            formatOptions = null;
        }

        var locales = makeArray(helperOptions.locales);
        var formats = get(this, 'formats');

        if (isEmpty(locales)) {
            locales = get(this, 'current');
        }

        if (formatOptions) {
            if (typeof formatOptions === 'string' && formats) {
                formatOptions = get(formats, type + '.' + formatOptions);
            }

            formatOptions = Ember.$.extend({}, formatOptions, helperOptions);
        } else {
            formatOptions = helperOptions;
        }

        switch (type) {
            case 'date':
            case 'time':
                return this.getDateTimeFormat(locales, formatOptions).format(value);
            case 'number':
                return this.getNumberFormat(locales, formatOptions).format(value);
            case 'relative':
                return this.getRelativeFormat(locales, formatOptions).format(value);
            default:
                throw new Error('Unrecognized simple format type: ' + type);
        }
    },

    _getLocaleInstance: function (locale) {
        var result = this.get('adapter').findLocale(locale);
        
        return Ember.RSVP.cast(result).then(function (localeInstance) {
            if (typeof localeInstance === 'undefined') {
                throw new Error('`locale` must be a string or a locale instance');
            }

            return localeInstance;
        });
    },

    _getTranslation: function (key, locales) {
        locales = locales ? Ember.makeArray(locales) : this.get('current');

        var result = this.get('adapter').findTranslation(locales, key);

        return Ember.RSVP.cast(result).then(function (result) {
            Ember.assert('findTranslation should return an object of instance `IntlGetResult`', result instanceof IntlGetResult);
        
            if (typeof result === 'undefined') {
                throw new Error('translation: `' + key + '` on locale(s): ' + locales.join(',') + ' was not found.');
            }

            return result;
        });
    }
});
