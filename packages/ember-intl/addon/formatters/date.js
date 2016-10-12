/**
 * Copyright 2015, Yahoo! Inc.
 * Copyrights licensed under the New BSD License. See the accompanying LICENSE file for terms.
 */

import Ember from 'ember';
import createFormatCache from 'intl-format-cache';

import Formatter from './-formatter';

const { assert, computed } = Ember;

function assertIsDate(date, errMsg) {
  assert(errMsg, isFinite(date));
}

const FormatDate = Formatter.extend({
  formatType: 'date',

  formatter: computed({
    get() {
      assert('Intl.DateTimeFormat missing. IntlJS polyfill required.', typeof Intl === 'object' && typeof Intl.DateTimeFormat === 'function');

      if (!Intl.DateTimeFormat) {
        throw new Error('Intl.DateTimeFormat not found, Intl.JS polyfill required.');
      }

      return createFormatCache(Intl.DateTimeFormat);
    }
  }).readOnly(),

  compute(value, options, ctx = {}) {
    const dateTime = new Date(value);
    assertIsDate(dateTime, 'A date or timestamp must be provided to format-date');

    const formatOptions = this.filterSupporedOptions(options);

    return this._format(dateTime, formatOptions, null, ctx);
  }
});

FormatDate.reopenClass({
  supportedOptions: [
    'localeMatcher', 'timeZone', 'hour12', 'formatMatcher', 'weekday',
    'era', 'year', 'month', 'day', 'hour', 'minute', 'second',
    'timeZoneName', 'format'
  ]
});

export default FormatDate;
