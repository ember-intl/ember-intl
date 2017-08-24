/**
 * Copyright 2015, Yahoo! Inc.
 * Copyrights licensed under the New BSD License. See the accompanying LICENSE file for terms.
 */

import createFormatCache from 'intl-format-cache';
import assertIsDate from '../utils/assert-is-date';
import Formatter from './-base';

const FormatDate = Formatter.extend({
  formatCache: createFormatCache(Intl.DateTimeFormat),

  format(value, options, context) {
    const date = new Date(value);
    assertIsDate(date, 'A date or timestamp must be provided to format-datetime');

    return this._super(date, this.filterOptions(options), null, context);
  }
});

FormatDate.reopenClass({
  formatType: 'datetime',
  supportedOptions: [
    'localeMatcher',
    'timeZone',
    'hour12',
    'formatMatcher',
    'weekday',
    'era',
    'year',
    'month',
    'day',
    'hour',
    'minute',
    'second',
    'timeZoneName'
  ]
});

export default FormatDate;
