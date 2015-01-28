/**
 * Copyright 2015, Yahoo! Inc.
 * Copyrights licensed under the New BSD License. See the accompanying LICENSE file for terms.
 */

import Ember from 'ember';
import FormatterMessage from './format-message';

var FormatHtmlMessage = FormatterMessage.extend({
    escapeProps: function (props) {
        return Object.keys(props).reduce(function (escapedProps, name) {
            var value = props[name];

            // TODO: Can we force string coersion here? Or would that not be needed
            // and possible mess with IntlMessageFormat?
            if (typeof value === 'string') {
                value = Ember.Handlebars.Utils.escapeExpression(value);
            }

            escapedProps[name] = value;
            return escapedProps;
        }, {});
    },

    format: function (value, hash, context) {
        var icuKeys = this.extractICUKeys(value);
        var model   = {};

        if (icuKeys && icuKeys.length) {
            model = Ember.$.extend(Ember.getProperties(context, icuKeys), hash);
        }

        var formatOptions = {
            formats: hash.format || this.filterFormatOptions(hash)
        };

        if (hash.locales) {
            formatOptions.locales = hash.locales;
        }

        return Ember.String.htmlSafe(this.intl.formatMessage(value, this.escapeProps(model), formatOptions));
    }
});

export default FormatHtmlMessage;
