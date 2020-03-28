/**
 * Copyright 2015, Yahoo! Inc.
 * Copyrights licensed under the New BSD License. See the accompanying LICENSE file for terms.
 */

import memoize from 'fast-memoize';
import Formatter from './-base';

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
];

/**
 * @private
 * @hide
 */
export default class FormatNumber extends Formatter {
  get options() {
    return NUMBER_OPTIONS;
  }

  constructor(config) {
    super(config);

    this.createNativeFormatter = memoize((locales, options) => {
      return new Intl.NumberFormat(locales, options);
    });
  }

  format(value, options, ctx) {
    return this._format(value, this.readOptions(options), undefined, ctx);
  }
}
