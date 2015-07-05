/**
 * Copyright 2015, Yahoo! Inc.
 * Copyrights licensed under the New BSD License. See the accompanying LICENSE file for terms.
 */

import Ember from 'ember';
import computed from 'ember-new-computed';
import Formatter from './-base';
import IntlGetResult from '../models/intl-get-result';
import createFormatCache from '../format-cache/memoizer';
import { IntlMessageFormat } from '../utils/data';

var get = Ember.get;

var FormatMessage = Formatter.extend({
    // TODO: move all the intl service logic out of here
    // formatters should not be coupled to the service
    intl: Ember.inject.service(),

    formatter: computed(() => {
        return createFormatCache(IntlMessageFormat);
    }).readOnly(),

    format(value, options = {}) {
        let locale = options.locale;
        let formatter = get(this, 'formatter');

        if (value instanceof IntlGetResult) {
            if (typeof locale === 'undefined') {
                locale = value.locale;
            }
            value = value.content;
        }

        if (typeof value === 'function') {
            return value(options);
        }

        if (typeof value === 'string') {
            value = formatter(value, locale, get(this, 'intl.formats'));
        }

        return value.format(options);
    }
});

FormatMessage.reopenClass({
    formatOptions: []
});

export default FormatMessage;
