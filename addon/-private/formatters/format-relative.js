/**
 * Copyright 2015, Yahoo! Inc.
 * Copyrights licensed under the New BSD License. See the accompanying LICENSE file for terms.
 */

import memoize from 'fast-memoize';
import { FormatError, ErrorCode } from 'intl-messageformat';
import Formatter from './-base';

const RELATIVE_TIME_OPTIONS = ['numeric', 'style'];

/**
 * @private
 * @hide
 */
export default class FormatRelative extends Formatter {
  constructor(config) {
    super(config);

    if (!Intl.RelativeTimeFormat) {
      config.onError({
        kind: 'polyfill',
        error: new FormatError(
          `Intl.RelativeTimeFormat is not available in this environment.
  Try polyfilling it using "@formatjs/intl-relativetimeformat"
  `,
          ErrorCode.MISSING_INTL_API
        ),
      });
    }

    this.createNativeFormatter = memoize((locales, options) => {
      return new Intl.RelativeTimeFormat(locales, options);
    });
  }

  get options() {
    return RELATIVE_TIME_OPTIONS;
  }

  format(value, options, context) {
    return this._format(value, this.readOptions(options), options.unit, context);
  }
}
