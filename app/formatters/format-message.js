/**
 * Copyright 2015, Yahoo! Inc.
 * Copyrights licensed under the New BSD License. See the accompanying LICENSE file for terms.
 */

import Ember from 'ember';
import Formatter from 'ember-intl/formatter-base';
import IntlGetResult from 'ember-intl/models/intl-get-result';

var validKey = /[\w|.]/;

var FormatMessage = Formatter.extend({
    format: function (value, options, optionalLocale) {
        var locales = optionalLocale || options.locales;
        var formatOptions = {};

        if (value instanceof IntlGetResult) {
            if (typeof locales === 'undefined') {
                locales = value.locale;
            }

            value = value.content;
        }

        if (locales) {
            formatOptions.locales = locales;
        }

        return this.get('intl').formatMessage(value, options, formatOptions);
    }
});

FormatMessage.reopenClass({
    formatOptions: Ember.A()
});

export default FormatMessage;
