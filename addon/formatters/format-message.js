/**
 * Copyright 2015, Yahoo! Inc.
 * Copyrights licensed under the New BSD License. See the accompanying LICENSE file for terms.
 */

import Ember from 'ember';
import computed from 'ember-new-computed';
import createFormatCache from 'intl-format-cache';
import IntlMessageFormat from 'intl-messageformat';
import Formatter from './-base';
import TranslationLookup from '../models/translation-lookup';

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

        if (value && value instanceof TranslationLookup) {
            if (typeof locale === 'undefined') {
                locale = value.locale;
            }
            value = value.translation;
        }

        const valueType = typeof value;

        if (valueType === 'function') {
            return value(options);
        }
        else if (valueType === 'string') {
            value = formatter(value, locale, get(this, 'intl.formats'));
        }

        return value.format(options);
    }
});

FormatMessage.reopenClass({
    formatOptions: []
});

export default FormatMessage;
