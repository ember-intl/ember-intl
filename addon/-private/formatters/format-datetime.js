/**
 * Copyright 2015, Yahoo! Inc.
 * Copyrights licensed under the New BSD License. See the accompanying LICENSE file for terms.
 */

import { assert } from '@ember/debug';
import createFormatCache from 'intl-format-cache';

import Formatter from './-base';

function assertIsDate(date, errMsg) {
  assert(errMsg, isFinite(date));
}

const FormatDate = Formatter.extend({
  formatter: createFormatCache(Intl.DateTimeFormat),

  format(value, options, ctx) {
    const dateTime = new Date(value);
    assertIsDate(dateTime, 'A date or timestamp must be provided to format-datetime');

    const _options = this.filterSupporedOptions(options);

    return this._format(dateTime, _options, undefined, ctx);
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
