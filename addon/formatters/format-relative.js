/*
 * Copyright 2015, Yahoo! Inc.
 * Copyrights licensed under the New BSD License. See the accompanying LICENSE file for terms.
 */

import { assert } from '@ember/debug';
import { computed } from '@ember/object';
import createFormatCache from 'intl-format-cache';
import IntlRelativeFormat from 'intl-relativeformat';

import Formatter from './-base';

function assertIsDate(date, errMsg) {
  assert(errMsg, isFinite(date));
}

/**
 * @class FormatRelativeFormatter
 */
const FormatRelative = Formatter.extend({
  formatter: computed({
    get() {
      return createFormatCache(IntlRelativeFormat);
    }
  }).readOnly(),

  format(value, options, ctx) {
    let dateValue = new Date(value);
    let formatOptions;

    /* TODO: remove assertion in 3.0, new Intl.DateTimeFormat().format() accepts no arguments */
    assertIsDate(dateValue, 'A date or timestamp must be provided to format-relative');

    if (options && typeof options.now !== 'undefined') {
      formatOptions = {
        now: options.now
      };
    }

    return this._format(dateValue, this.filterSupporedOptions(options), formatOptions, ctx);
  }
});

FormatRelative.reopenClass({
  formatType: 'relative',
  supportedOptions: ['style', 'units']
});

export default FormatRelative;
