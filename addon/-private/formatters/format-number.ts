/**
 * Copyright 2015, Yahoo! Inc.
 * Copyrights licensed under the New BSD License. See the accompanying LICENSE file for terms.
 */

import memoize from 'fast-memoize';

import { BaseFormatter, FormatterContext } from './-base';

export type Options = Intl.NumberFormatOptions;

/**
 * @private
 * @hide
 */
export default class FormatNumber extends BaseFormatter<number, string, Options> {
  createNativeFormatter = memoize((locales, options) => {
    return new Intl.NumberFormat(locales, options);
  });

  constructor() {
    super([
      'locale',
      'format',
      'localeMatcher',
      'style',
      'currency',
      'currencyDisplay',
      'useGrouping',
      'minimumIntegerDigits',
      'minimumFractionDigits',
      'maximumFractionDigits',
      'minimumSignificantDigits',
      'maximumSignificantDigits',
      'notation'
    ]);
  }

  format(value: number, options?: Options, ctx?: FormatterContext) {
    return this._format(value, this.readOptions(options), undefined, ctx);
  }
}
