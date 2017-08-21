/**
 * Copyright 2015, Yahoo! Inc.
 * Copyrights licensed under the New BSD License. See the accompanying LICENSE file for terms.
 */

import createFormatCache from 'intl-format-cache';
import Formatter from './-base';

const FormatNumber = Formatter.extend({
  formatter: createFormatCache(Intl.NumberFormat),

  format(value, options, ctx) {
    return this._format(value, this.filterSupporedOptions(options), undefined, ctx);
  }
});

FormatNumber.reopenClass({
  formatType: 'number',
  supportedOptions: [
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
  ]
});

export default FormatNumber;
