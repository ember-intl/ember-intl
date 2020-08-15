/**
 * Copyright 2015, Yahoo! Inc.
 * Copyrights licensed under the New BSD License. See the accompanying LICENSE file for terms.
 */

import memoize from 'fast-memoize';
import Formatter, { BaseOptions } from './-base';

const NUMBER_OPTIONS = [
  'localeMatcher',
  'style',
  'currency',
  'currencyDisplay',
  'unit',
  'unitDisplay',
  'useGrouping',
  'minimumIntegerDigits',
  'minimumFractionDigits',
  'maximumFractionDigits',
  'minimumSignificantDigits',
  'maximumSignificantDigits',
  // Unified NumberFormat (Stage 3 as of 10/22/19)
  'compactDisplay',
  'currencyDisplay',
  'currencySign',
  'notation',
  'signDisplay',
  'unitDisplay',
  'unit',
] as readonly (keyof Intl.NumberFormatOptions)[];

/**
 * @private
 * @hide
 */
export default class FormatNumber extends Formatter<Intl.NumberFormatOptions> {
  static readonly type = 'number';

  createNativeFormatter = memoize((locales: string | string[], options: Intl.NumberFormatOptions) => {
    return new Intl.NumberFormat(locales, options);
  });

  get options() {
    return NUMBER_OPTIONS;
  }

  format(locale: string | string[], value: number, formatOptions: Intl.NumberFormatOptions & BaseOptions): string {
    const formatterOptions = this.readOptions(formatOptions);

    this.validateFormatterOptions(locale, formatterOptions);
    const formatterInstance = this.createNativeFormatter(locale, formatterOptions);

    return formatterInstance.format(value);
  }
}
