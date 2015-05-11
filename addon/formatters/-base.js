/**
 * Copyright 2015, Yahoo! Inc.
 * Copyrights licensed under the New BSD License. See the accompanying LICENSE file for terms.
 */

import Ember from 'ember';

var get = Ember.get;

var FormatBase = Ember.Object.extend({
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
        var locales   = options.locales;
        return formatter(locales, options).format(value, formatOptions);
    }
});

FormatBase.reopenClass({
    formatOptions: Ember.A(['locales', 'format']),
    concatenatedProperties: Ember.A(['formatOptions'])
});

export default FormatBase;
