/**
 * Copyright 2015, Yahoo! Inc.
 * Copyrights licensed under the New BSD License. See the accompanying LICENSE file for terms.
 */

import Ember from 'ember';
import { IntlMessageFormat } from '../utils/data';
import createFormatCache from '../format-cache/memoizer';
import IntlGetResult from '../models/intl-get-result';

var makeArray    = Ember.makeArray;
var get          = Ember.get;
var computed     = Ember.computed;
var observer     = Ember.observer;
var isEmpty      = Ember.isEmpty;
var runOnce      = Ember.run.once;

function proxy (name) {
    var formatter;

    return function () {
        if (!formatter) {
            formatter = this.container.lookup('ember-intl@formatter:format-' + name);
        }

        return formatter.format.apply(formatter, arguments);
    };
}

export default Ember.Service.extend(Ember.Evented, {
    locales:           null,
    getMessageFormat:  null,
    adapterType:       '-intl-adapter',

    init: function () {
        this._super.apply(this, arguments);

        this.getMessageFormat = createFormatCache(IntlMessageFormat);
    },

    formatRelative: proxy('relative'),
    formatNumber:   proxy('number'),
    formatTime:     proxy('time'),
    formatDate:     proxy('date'),

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

    addMessage: function (locale, key, value) {
        return this.findLanguage(locale).then(function (localeInstance) {
            return localeInstance.addMessage(key, value);
        });
    },

    addMessages: function (locale, messageObject) {
        return this.findLanguage(locale).then(function (localeInstance) {
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

        var locales = options.locales;
        var formats = options.formats || get(this, 'formats');

        if (isEmpty(locales)) {
            locales = get(this, 'locales');
        }

        if (typeof message === 'string') {
            message = this.getMessageFormat(message, locales, formats);
        }

        return message.format(values);
    },

    createLocale: function (locale, payload) {
        var name = 'ember-intl@translation:' + locale;
        var modelType = this.container.lookupFactory('ember-intl@model:translation');

        if (this.container.has(name)) {
            this.container.unregister(name);
        }

        this.container.register(name, modelType.extend(payload));
    },

    findLanguage: function (locale) {
        var result = this.get('adapter').findLanguage(locale);

        return Ember.RSVP.cast(result).then(function (localeInstance) {
            if (typeof localeInstance === 'undefined') {
                throw new Error('`locale` must be a string or a locale instance');
            }

            return localeInstance;
        });
    },

    findTranslation: function (key, locales) {
        locales = locales ? makeArray(locales) : makeArray(get(this, 'locales'));

        var translation = this.get('adapter').findTranslation(locales, key);

        Ember.assert('findTranslation should return an object of instance `IntlGetResult`', translation instanceof IntlGetResult);

        if (typeof translation === 'undefined') {
            throw new Error('translation: `' + key + '` on locale(s): ' + locales.join(',') + ' was not found.');
        }

        return translation;
    }
});
