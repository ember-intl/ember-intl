/**
 * Copyright 2015, Yahoo! Inc.
 * Copyrights licensed under the New BSD License. See the accompanying LICENSE file for terms.
 */

import memoize from 'fast-memoize';
import { FormatError, ErrorCode } from 'intl-messageformat';
import { MISSING_INTL_API } from '../error-types';
import Formatter from './-base';

const RELATIVE_TIME_OPTIONS = ['numeric', 'style'];

/**
 * @private
 * @hide
 */
export default class FormatRelative extends Formatter {
  static type = 'relative';

  constructor(config) {
    super(config);

    this.createNativeFormatter = memoize((locales, options) => {
      if (!Intl || !Intl.RelativeTimeFormat) {
        config.onError({
          kind: MISSING_INTL_API,
          error: new FormatError(
            `Intl.RelativeTimeFormat is not available in this environment.
    Try polyfilling it using "@formatjs/intl-relativetimeformat"
    `,
            ErrorCode.MISSING_INTL_API
          ),
        });

        return;
      }

      return new Intl.RelativeTimeFormat(locales, options);
    });
  }

  get options() {
    return RELATIVE_TIME_OPTIONS;
  }

  format(locale, value, formatOptions) {
    const formatterOptions = this.readOptions(formatOptions);

    this.validateFormatterOptions(locale, formatterOptions);
    const formatterInstance = this.createNativeFormatter(locale, formatterOptions);

    return formatterInstance.format(value, formatOptions.unit || formatterOptions.unit);
  }
}
