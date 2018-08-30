/**
 * Copyright 2015, Yahoo! Inc.
 * Copyrights licensed under the New BSD License. See the accompanying LICENSE file for terms.
 */

import { A as emberArray } from '@ember/array';
import createFormatCache from 'intl-format-cache';
import Formatter from './-base';

export default class FormatDate extends Formatter {
  constructor() {
    super();
    this.formatter = createFormatCache(Intl.DateTimeFormat);
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
      'timeZoneName'
    ]);
  }

  format(value, options, ctx) {
    const dateTime = new Date(value);
    const formatOptions = this.readOptions(options);

    return this._format(dateTime, formatOptions, undefined, ctx);
  }
}
