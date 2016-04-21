/**
 * Copyright 2015, Yahoo! Inc.
 * Copyrights licensed under the New BSD License. See the accompanying LICENSE file for terms.
 */

import Ember from 'ember';
import createFormatCache from 'intl-format-cache';
import IntlMessageFormat from 'intl-messageformat';

import Formatter from './-base';

const { get, computed } = Ember;

const FormatMessage = Formatter.extend({
  formatter: computed({
    get() {
      return createFormatCache(IntlMessageFormat);
    }
  }).readOnly(),

  format(value, options = {}, ctx = {}) {
    const { formats, locale } = ctx;
    const formatter = get(this, 'formatter');

    return formatter(value, locale, formats).format(options);
  }
});

export default FormatMessage;
