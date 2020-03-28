/**
 * Copyright 2015, Yahoo! Inc.
 * Copyrights licensed under the New BSD License. See the accompanying LICENSE file for terms.
 */

import memoize from 'fast-memoize';
import Formatter from './-base';

const DATE_TIME_OPTIONS = [
  'localeMatcher',
  'formatMatcher',
  'timeZone',
  'hour12',
  'weekday',
  'era',
  'year',
  'month',
  'day',
  'hour',
  'minute',
  'second',
  'timeZoneName',
];

/**
 * @private
 * @hide
 */
export default class FormatDate extends Formatter {
  constructor(config) {
    super(config);

    this.createNativeFormatter = memoize((locales, options) => {
      return new Intl.DateTimeFormat(locales, options);
    });
  }

  get options() {
    return DATE_TIME_OPTIONS;
  }

  format(value, options, ctx) {
    const dateTime = new Date(value);
    const formatOptions = this.readOptions(options);

    return this._format(dateTime, formatOptions, undefined, ctx);
  }
}
