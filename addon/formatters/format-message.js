/**
 * Copyright 2015, Yahoo! Inc.
 * Copyrights licensed under the New BSD License. See the accompanying LICENSE file for terms.
 */

import Ember from 'ember';
import Formatter from './-base';
import IntlGetResult from '../models/intl-get-result';
import createFormatCache from '../format-cache/memoizer';
import { IntlMessageFormat } from '../utils/data';
import computed from 'ember-new-computed';

var FormatMessage = Formatter.extend({
    intl: Ember.inject.service(),

    formatter: computed(() => {
        return createFormatCache(IntlMessageFormat);
    }).readOnly(),

    format(value, options, optionalLocale) {
        let locale = optionalLocale || options.locale;
        let formatOptions = {};

        if (value instanceof IntlGetResult) {
            if (typeof locale === 'undefined') {
                locale = value.locale;
            }

            value = value.content;
        }

        if (locale) {
            formatOptions.locale = locale;
        }

        return this.get('intl').formatMessage(value, options, formatOptions);
    }
});

FormatMessage.reopenClass({
    formatOptions: Ember.A()
});

export default FormatMessage;
