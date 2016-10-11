/**
 * Copyright 2015, Yahoo! Inc.
 * Copyrights licensed under the New BSD License. See the accompanying LICENSE file for terms.
 */

import Ember from 'ember';
import createFormatCache from 'intl-format-cache';

import Formatter from './-formatter';

const { computed } = Ember;

const FormatNumber = Formatter.extend({
  formatType: 'number',

  formatter: computed({
    get() {
      return createFormatCache(Intl.NumberFormat);
    }
  }).readOnly(),

  compute(value, options, ctx = {}) {
    return this._format(value, this.filterSupporedOptions(options), null, ctx);
  }
});

FormatNumber.reopenClass({
  supportedOptions: [
    'localeMatcher', 'style', 'currency', 'currencyDisplay',
    'useGrouping', 'minimumIntegerDigits', 'minimumFractionDigits',
    'maximumFractionDigits', 'minimumSignificantDigits',
    'maximumSignificantDigits', 'format'
  ]
});

export default FormatNumber;
