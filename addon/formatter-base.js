/**
 * Copyright 2015, Yahoo! Inc.
 * Copyrights licensed under the New BSD License. See the accompanying LICENSE file for terms.
 */

import Ember from 'ember';

var makeArray = Ember.makeArray;
var isEmpty = Ember.isEmpty;
var get = Ember.get;

var FormatBase = Ember.Object.extend({
    intl: Ember.inject.service(),

    filterFormatOptions: function (hash) {
        hash = hash || {};

        var match = false;

        var options = this.constructor.formatOptions.reduce(function (opts, name) {
            if (hash.hasOwnProperty(name)) {
                match = true;
                opts[name] = hash[name];
            }

            return opts;
        }, {});

        if (match) {
            return options;
        }
    },

    _format: function (value, options, formatOptions) {
        options = options || {};

        var formatter = this.get('formatter');

        var intl      = this.get('intl'); // todo: remove?
        var locales   = makeArray(options.locales);
        var formats   = get(intl, 'formats');
        var format;

        if (isEmpty(locales)) {
            locales = get(intl, 'current');
        }

        if (options && options.format) {
            if (typeof options.format === 'string' && formats) {
                format = get(formats, this.formatType + '.' + options.format);
            }

            Ember.merge(options, format);
        }

        return formatter(locales, options).format(value, formatOptions);
    }
});

FormatBase.reopenClass({
    formatOptions: Ember.A(['locales', 'format']),
    concatenatedProperties: Ember.A(['formatOptions'])
});

export default FormatBase;
