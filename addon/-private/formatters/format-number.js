/**
 * Copyright 2015, Yahoo! Inc.
 * Copyrights licensed under the New BSD License. See the accompanying LICENSE file for terms.
 */

import createFormatCache from 'intl-format-cache';
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
    super(...arguments);
    this.formatter = createFormatCache(Intl.NumberFormat);
  }

  format(value, options, ctx) {
    return this._format(value, this.readOptions(options), undefined, ctx);
  }
}
