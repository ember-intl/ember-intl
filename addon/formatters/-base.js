/**
 * Copyright 2015, Yahoo! Inc.
 * Copyrights licensed under the New BSD License. See the accompanying LICENSE file for terms.
 */

import Ember from 'ember';

var get = Ember.get;
var a = Ember.A;
var camelize = Ember.String.camelize;

var FormatBase = Ember.Object.extend({
    filterFormatOptions(hash = {}) {
        let formatOptions = this.constructor.formatOptions;
        let camelizedKey = null;
        let match = false;
        let out = {};

        for (var key in hash) {
            camelizedKey = camelize(key);
            if (formatOptions.contains(camelizedKey)) {
                match = true;
                out[camelizedKey] = hash[key];
            }
        }

        if (match) {
            return out;
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
    formatOptions: a(['locale', 'format']),
    concatenatedProperties: a(['formatOptions'])
});

export default FormatBase;
