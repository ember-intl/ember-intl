/**
 * Copyright 2015, Yahoo! Inc.
 * Copyrights licensed under the New BSD License. See the accompanying LICENSE file for terms.
 */

import memoize from 'fast-memoize';
import IntlRelativeFormat from '@ember-intl/intl-relativeformat';
import { BaseFormatter, FormatterOptions, FormatterContext } from './-base';
import { Dateish } from './format-date';

/**
 * @private
 * @hide
 */
export default class FormatRelative extends BaseFormatter<Dateish> {
  createNativeFormatter = memoize((locales, options) => {
    return new IntlRelativeFormat(locales, options);
  });

  constructor() {
    super(['locale', 'format', 'style', 'units']);
  }

  format(value: Dateish, options: FormatterOptions | undefined, ctx: FormatterContext) {
    let dateValue = new Date(value);
    let formatOptions;

    if (options && typeof options.now !== 'undefined') {
      formatOptions = {
        now: options.now
      };
    }

    return this._format(dateValue, this.readOptions(options), formatOptions, ctx);
  }
}
