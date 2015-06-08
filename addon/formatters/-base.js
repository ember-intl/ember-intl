/**
 * Copyright 2015, Yahoo! Inc.
 * Copyrights licensed under the New BSD License. See the accompanying LICENSE file for terms.
 */

import Ember from 'ember';

var get = Ember.get;

var FormatBase = Ember.Object.extend({
    filterFormatOptions(hash) {
        hash = hash || {};

        let match = false;

        let options = this.constructor.formatOptions.reduce((opts, name) => {
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

    _format(value, options, formatOptions) {
        options = options || {};
        let formatter = get(this, 'formatter');
        let locale   = options.locale;
        return formatter(locale, options).format(value, formatOptions);
    }
});

FormatBase.reopenClass({
    formatOptions: Ember.A(['locale', 'format']),
    concatenatedProperties: Ember.A(['formatOptions'])
});

export default FormatBase;
