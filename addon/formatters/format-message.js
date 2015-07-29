/**
 * Copyright 2015, Yahoo! Inc.
 * Copyrights licensed under the New BSD License. See the accompanying LICENSE file for terms.
 */

import Ember from 'ember';
import computed from 'ember-new-computed';
import createFormatCache from 'intl-format-cache';
import IntlMessageFormat from 'intl-messageformat';
import Formatter from './-base';

const { get } = Ember;

let FormatMessage = Formatter.extend({
    formatter: computed({
      get() {
          return createFormatCache(IntlMessageFormat);
      }
    }),

    format(value, options, formats) {
        const { locale } = options;
        const formatter = get(this, 'formatter');

        if (typeof value === 'string') {
            value = formatter(value, locale, formats);
        }

        return value.format(options);
    }
});

export default FormatMessage;
