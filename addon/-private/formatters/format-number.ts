/**
 * Copyright 2015, Yahoo! Inc.
 * Copyrights licensed under the New BSD License. See the accompanying LICENSE file for terms.
 */

import memoize from 'fast-memoize';

import { BaseFormatter, FormatterOptions, FormatterContext } from './-base';

/**
 * @private
 * @hide
 */
export default class FormatNumber extends BaseFormatter<number> {
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

  format(value: number, options: FormatterOptions | undefined, ctx: FormatterContext) {
    return this._format(value, this.readOptions(options), undefined, ctx);
  }
}
