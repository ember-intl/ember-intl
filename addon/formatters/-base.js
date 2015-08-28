/**
 * Copyright 2015, Yahoo! Inc.
 * Copyrights licensed under the New BSD License. See the accompanying LICENSE file for terms.
 */

import Ember from 'ember';
import arrayToHash from '../utils/array-to-hash';

const {
    get,
    String:emberString,
    Object:emberObject
} = Ember;

const { camelize } = emberString;

const FormatBase = emberObject.extend({
    init() {
        this._super(...arguments);
        this.options = arrayToHash(this.constructor.supportedOptions);
    },

    /**
    * Filters out all of the whitelisted formatter options
    *
    * @method filterSupporedOptions
    * @param {Object} Options object
    * @return {Object} Options object containing just whitelisted options
    * @private
    */
    filterSupporedOptions(input = {}) {
        let camelizedKey;
        let foundMatch = false;
        const out = {};

        for (let key in input) {
            camelizedKey = camelize(key);
            if (this.options[camelizedKey]) {
                foundMatch = true;
                out[camelizedKey] = input[key];
            }
        }

        if (foundMatch) {
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
    _format(value, formatterOptions = {}, formatOptions = {}) {
        const formatter = get(this, 'formatter');
        const { locale } = formatterOptions;

        if (!locale) {
            throw new Error(
                `No locale specified.  This is typically done application-wide within routes/application.js. Instructions: https://github.com/yahoo/ember-intl/blob/master/README.md#configure-application-wide-locale`
            );
        }

        return formatter(locale, formatterOptions).format(value, formatOptions);
    }
});

FormatBase.reopenClass({
    supportedOptions: ['locale', 'format'],
    concatenatedProperties: ['supportedOptions']
});

export default FormatBase;
