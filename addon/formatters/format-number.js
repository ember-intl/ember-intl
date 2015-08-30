/**
 * Copyright 2015, Yahoo! Inc.
 * Copyrights licensed under the New BSD License. See the accompanying LICENSE file for terms.
 */

import createFormatCache from 'intl-format-cache';
import computed from 'ember-new-computed';
import Formatter from './-base';

const FormatNumber = Formatter.extend({
  formatType: 'number',

  formatter: computed({
    get() {
      return createFormatCache(Intl.NumberFormat);
    }
  }),

  format(value, options) {
    return this._format(value, this.filterSupporedOptions(options));
  }
});

FormatNumber.reopenClass({
  supportedOptions: [
    'localeMatcher', 'style', 'currency', 'currencyDisplay',
    'useGrouping', 'minimumIntegerDigits', 'minimumFractionDigits',
    'maximumFractionDigits', 'minimumSignificantDigits',
    'maximumSignificantDigits'
  ]
});

export default FormatNumber;
