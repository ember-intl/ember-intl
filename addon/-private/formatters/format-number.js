/**
 * Copyright 2015, Yahoo! Inc.
 * Copyrights licensed under the New BSD License. See the accompanying LICENSE file for terms.
 */

import memoize from 'fast-memoize';
import { A as emberArray } from '@ember/array';

import Formatter from './-base';

export default class FormatNumber extends Formatter {
  get options() {
    return emberArray([
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
      'maximumSignificantDigits'
    ]);
  }

  constructor() {
    super();

    this.createNativeFormatter = memoize((locales, options) => {
      return new Intl.NumberFormat(locales, options);
    });
  }

  format(value, options, ctx) {
    return this._format(value, this.readOptions(options), undefined, ctx);
  }
}
