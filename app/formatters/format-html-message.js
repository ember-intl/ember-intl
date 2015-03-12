/**
 * Copyright 2015, Yahoo! Inc.
 * Copyrights licensed under the New BSD License. See the accompanying LICENSE file for terms.
 */

import Ember from 'ember';
import FormatterMessage from './format-message';
import IntlGetResult from 'ember-intl/models/intl-get-result';

var FormatHtmlMessage = FormatterMessage.extend({
    escapeProps: function (hash) {
        var value;

        return Object.keys(hash).reduce(function (result, hashKey) {
            value = hash[hashKey];

            if (typeof value === 'string') {
                value = Ember.Handlebars.Utils.escapeExpression(value);
            }

            result[hashKey] = value;
            return result;
        }, {});
    },

    format: function (value, hash) {
        var locales = hash.locales;
        hash = this.escapeProps(hash);
        var superResult = this._super(value, hash, locales);
        return Ember.String.htmlSafe(superResult);
    }
});

export default FormatHtmlMessage;
