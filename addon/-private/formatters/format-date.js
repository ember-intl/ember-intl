/**
 * Copyright 2015, Yahoo! Inc.
 * Copyrights licensed under the New BSD License. See the accompanying LICENSE file for terms.
 */

import { A as emberArray } from '@ember/array';
import memoize from 'fast-memoize';
import Formatter from './-base';

/**
 * @private
 * @hide
 */
export default class FormatDate extends Formatter {
  constructor() {
    super();

    this.createNativeFormatter = memoize((locales, options) => {
      return new Intl.DateTimeFormat(locales, options);
    });
  }

  get options() {
    return emberArray([
      'locale',
      'format',
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
      'timeZoneName',
    ]);
  }

  format(value, options, ctx) {
    const dateTime = new Date(value);
    const formatOptions = this.readOptions(options);

    return this._format(dateTime, formatOptions, undefined, ctx);
  }
}
