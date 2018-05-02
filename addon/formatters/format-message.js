/**
 * Copyright 2015, Yahoo! Inc.
 * Copyrights licensed under the New BSD License. See the accompanying LICENSE file for terms.
 */

import createFormatCache from 'intl-format-cache';
import IntlMessageFormat from 'intl-messageformat';

import Formatter from './-base';

export default class FormatMessage extends Formatter {
  constructor() {
    super();
    this.formatter = createFormatCache(IntlMessageFormat);
  }

  format(value, options, { formats, locale }) {
    return this.formatter(value, locale, formats).format(options);
  }
}
