/**
 * Copyright 2015, Yahoo! Inc.
 * Copyrights licensed under the New BSD License. See the accompanying LICENSE file for terms.
 */

import Ember from 'ember';
import FormatterMessage from './format-message';

var FormatHtmlMessage = FormatterMessage.extend({
    escapeProps(options) {
        let value;

        return Object.keys(options).reduce((result, hashKey) => {
            value = options[hashKey];

            if (typeof value === 'string') {
                value = Ember.Handlebars.Utils.escapeExpression(value);
            }

            result[hashKey] = value;
            return result;
        }, {});
    },

    format(value, options) {
        let locale = options.locale;
        options = this.escapeProps(options);
        let superResult = this._super(value, options, locale);
        return Ember.String.htmlSafe(superResult);
    }
});

export default FormatHtmlMessage;
