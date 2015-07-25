/**
 * Copyright 2015, Yahoo! Inc.
 * Copyrights licensed under the New BSD License. See the accompanying LICENSE file for terms.
 */

import Ember from 'ember';

const get = Ember.get;
const camelize = Ember.String.camelize;

let FormatBase = Ember.Object.extend({
    /**
    * Filters out all of the whitelisted formatter options from an Object.
    *
    * @method filterWhitelistedOptions
    * @param {Object} Options object
    * @return {Object} Options object containing just whitelisted options
    */
    filterWhitelistedOptions(input = {}) {
        let formatOptions = this.constructor.formatOptions;
        let camelizedKey = null;
        let match = false;
        let out = {};

        for (let key in input) {
            camelizedKey = camelize(key);
            if (Ember.A(formatOptions).contains(camelizedKey)) {
                match = true;
                out[camelizedKey] = input[key];
            }
        }

        if (match) {
            return out;
        }
    },

    /**
    * Invokes the Intl formatter methods
    *
    * @method _format
    * @param {value} Raw input value that needs formatting
    * @return {Object} Formatter options hash
    * @return {Object} Format options hash
    * @private
    */
    _format(value, options = {}, formatOptions = {}) {
        let formatter = get(this, 'formatter');
        let { locale } = options;

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
    formatOptions: ['locale', 'format'],
    concatenatedProperties: ['formatOptions']
});

export default FormatBase;
