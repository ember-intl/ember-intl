/**
 * Copyright 2015, Yahoo! Inc.
 * Copyrights licensed under the New BSD License. See the accompanying LICENSE file for terms.
 */

import Ember from 'ember';

var get = Ember.get;

var FormatBase = Ember.Object.extend({
    filterFormatOptions(hash = {}) {
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

    _format(value, options = {}, formatOptions = {}) {
        let formatter = get(this, 'formatter');
        let locale = options.locale;
        if (!locale) {
            throw new Error(`
                No locale specified.  This is typically done application wide within routes/application.js
                you can read how to configure it here: https://github.com/yahoo/ember-intl/blob/master/README.md#configure-application-wide-locale
            `);
        }
        return formatter(locale, options).format(value, formatOptions);
    }
});

FormatBase.reopenClass({
    formatOptions: Ember.A(['locale', 'format']),
    concatenatedProperties: Ember.A(['formatOptions'])
});

export default FormatBase;
