/**
 * Copyright 2015, Yahoo! Inc.
 * Copyrights licensed under the New BSD License. See the accompanying LICENSE file for terms.
 */

import memoize from 'fast-memoize';
import IntlRelativeFormat, { IntlRelativeFormatOptions, FormatOptions } from '@ember-intl/intl-relativeformat';
import { BaseFormatter, FormatterContext } from './-base';
import { Dateish } from './format-date';

export type Options = IntlRelativeFormatOptions & FormatOptions;

/**
 * @private
 * @hide
 */
export default class FormatRelative extends BaseFormatter<Dateish, string, IntlRelativeFormatOptions, FormatOptions> {
  createNativeFormatter = memoize((locales, options?: IntlRelativeFormatOptions) => {
    return new IntlRelativeFormat(locales, options);
  });

  constructor() {
    super(['locale', 'format', 'style', 'units']);
  }

  format(value: Dateish, options?: Options, ctx?: FormatterContext) {
    let dateValue = new Date(value);
    let formatOptions: FormatOptions | undefined;

    if (options && typeof options.now !== 'undefined') {
      formatOptions = {
        now: options.now
      };
    }

    return this._format(dateValue, this.readOptions(options), formatOptions, ctx);
  }
}
