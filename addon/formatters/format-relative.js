/**
 * Copyright 2015, Yahoo! Inc.
 * Copyrights licensed under the New BSD License. See the accompanying LICENSE file for terms.
 */

import Ember from 'ember';
import IntlRelativeFormat from 'intl-relativeformat';

import Formatter from '../formatter';

const { assert, computed } = Ember;

function assertIsDate(date, errMsg) {
  assert(errMsg, isFinite(date));
}

const FormatRelative = Formatter.extend({
  formatter: computed({
    get() {
      return this.memoizer(IntlRelativeFormat);
    }
  }).readOnly(),

  format(value, options = {}, ctx = {}) {
    const dateValue = new Date(value);
    assertIsDate(dateValue, 'A date or timestamp must be provided to format-relative');

    return this._format(dateValue, this.filterSupporedOptions(options), {
      now: options.now
    }, ctx);
  }
});

FormatRelative.reopenClass({
  supportedOptions: ['style', 'units']
});

export default FormatRelative;
