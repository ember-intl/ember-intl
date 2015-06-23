/**
 * Copyright 2015, Yahoo! Inc.
 * Copyrights licensed under the New BSD License. See the accompanying LICENSE file for terms.
 */

import Ember from 'ember';
import Formatter from './-base';
import AdapterResult from '../models/adapter-result';
import createFormatCache from '../format-cache/memoizer';
import { IntlMessageFormat } from '../utils/data';
import computed from 'ember-new-computed';

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

        if (value instanceof AdapterResult) {
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
    formatOptions: Ember.A()
});

export default FormatMessage;
