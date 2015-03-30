/**
 * Copyright 2015, Yahoo! Inc.
 * Copyrights licensed under the New BSD License. See the accompanying LICENSE file for terms.
 */

import Ember from 'ember';

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

        var formatter = get(this, 'formatter');
        var intl      = get(this, 'intl');
        var locales   = options.locales;
        var formats, format;

        if (isEmpty(locales)) {
            locales = get(intl, 'locales');
        }

        if (options && options.format) {
            formats = get(intl, 'formats');
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
