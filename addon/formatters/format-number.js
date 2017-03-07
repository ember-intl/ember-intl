/**
 * Copyright 2015, Yahoo! Inc.
 * Copyrights licensed under the New BSD License. See the accompanying LICENSE file for terms.
 */

import Ember from 'ember';

import Formatter from '../formatter';

const { computed } = Ember;

const FormatNumber = Formatter.extend({
  formatter: computed({
    get() {
      return this.memoizer(Intl.NumberFormat);
    }
  }).readOnly(),

  format(value, options, ctx = {}) {
    return this._format(value, this.filterSupporedOptions(options), null, ctx);
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
