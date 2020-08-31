/**
 * Copyright 2015, Yahoo! Inc.
 * Copyrights licensed under the New BSD License. See the accompanying LICENSE file for terms.
 */

import memoize from 'fast-memoize';
import Formatter, { BaseOptions } from './-base';

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
  'hourCycle',
] as readonly (keyof Intl.DateTimeFormatOptions)[];

/**
 * @private
 * @hide
 */
export default abstract class FormatDateTime extends Formatter<Intl.DateTimeFormatOptions> {
  static readonly type: 'date' | 'time';

  createNativeFormatter = memoize((locales: string | string[], options: Intl.DateTimeFormatOptions) => {
    return new Intl.DateTimeFormat(locales, options);
  });

  get options() {
    return DATE_TIME_OPTIONS;
  }

  format(
    locale: string | string[],
    value: ConstructorParameters<typeof Date>[0],
    formatOptions?: Intl.DateTimeFormatOptions & BaseOptions
  ): string {
    const formatterOptions = this.readOptions(formatOptions);

    this.validateFormatterOptions(locale, formatterOptions);
    const formatterInstance = this.createNativeFormatter(locale, formatterOptions);

    return formatterInstance.format(new Date(value));
  }
}
