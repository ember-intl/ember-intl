/**
 * Copyright 2015, Yahoo! Inc.
 * Copyrights licensed under the New BSD License. See the accompanying LICENSE file for terms.
 */

import Ember from 'ember';
import IntlRelativeFormat from 'intl-relativeformat';
import createFormatCache from 'intl-format-cache';

import Formatter from './-base';

const { assert, computed } = Ember;

function assertIsDate(date, errMsg) {
  assert(errMsg, isFinite(date));
}

const FormatRelative = Formatter.extend({
  formatter: computed({
    get() {
      return createFormatCache(IntlRelativeFormat);
    }
  }).readOnly(),

  format(value, options, ctx) {
    const dateValue = new Date(value);

    /* TODO: remove assertion in 3.0, Intl.DateTimeFormat accepts no arguments */
    assertIsDate(dateValue, 'A date or timestamp must be provided to format-relative');

    return this._format(dateValue, this.filterSupporedOptions(options), {
      now: options && options.now
    }, ctx);
  }
});

FormatRelative.reopenClass({
  formatType: 'relative',
  supportedOptions: ['style', 'units']
});

export default FormatRelative;
