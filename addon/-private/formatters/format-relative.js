/**
 * Copyright 2015, Yahoo! Inc.
 * Copyrights licensed under the New BSD License. See the accompanying LICENSE file for terms.
 */

import createFormatCache from 'intl-format-cache';
import IntlRelativeFormat from 'intl-relativeformat';
import assertIsDate from '../utils/assert-is-date';

import Formatter from './-base';

const FormatRelative = Formatter.extend({
  formatCache: createFormatCache(IntlRelativeFormat),

  format(value, options, context) {
    let dateValue = new Date(value);
    let formatOptions = null;
    assertIsDate(dateValue, 'A date or timestamp must be provided to format-relative');

    if (options && typeof options.now !== 'undefined') {
      formatOptions = {
        now: options.now
      };
    }

    return this._super(dateValue, this.filterOptions(options), formatOptions, context);
  }
});

FormatRelative.reopenClass({
  formatType: 'relative',
  supportedOptions: ['style', 'units']
});

export default FormatRelative;
