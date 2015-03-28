/**
 * Copyright 2015, Yahoo! Inc.
 * Copyrights licensed under the New BSD License. See the accompanying LICENSE file for terms.
 */

import Ember from 'ember';
import FormatterMessage from './format-message';
import IntlGetResult from 'ember-intl/models/intl-get-result';

var FormatHtmlMessage = FormatterMessage.extend({
    escapeProps: function (options) {
        var value;

        return Object.keys(options).reduce(function (result, hashKey) {
            value = options[hashKey];

            if (typeof value === 'string') {
                value = Ember.Handlebars.Utils.escapeExpression(value);
            }

            result[hashKey] = value;
            return result;
        }, {});
    },

    format: function (value, options) {
        var locales = options.locales;
        options = this.escapeProps(options);
        var superResult = this._super(value, options, locales);
        return Ember.String.htmlSafe(superResult);
    }
});

export default FormatHtmlMessage;
