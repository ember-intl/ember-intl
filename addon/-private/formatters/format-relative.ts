/**
 * Copyright 2015, Yahoo! Inc.
 * Copyrights licensed under the New BSD License. See the accompanying LICENSE file for terms.
 */

import memoize from 'fast-memoize';
import { FormatError } from 'intl-messageformat';
import { MISSING_INTL_API } from '../error-types';
import Formatter, { BaseOptions } from './-base';

// `Intl.RelativeTimeFormat` will be added in TypeScript 4.0
// @see https://github.com/microsoft/TypeScript/pull/36084#issuecomment-649080072

/**
 * Unit to use in the relative time internationalized message.
 *
 * [MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/RelativeTimeFormat/format#Parameters).
 *
 * [Specification](https://tc39.es/ecma402/#sec-singularrelativetimeunit).
 */
type RelativeTimeFormatUnit =
  | 'year'
  | 'years'
  | 'quarter'
  | 'quarters'
  | 'month'
  | 'months'
  | 'week'
  | 'weeks'
  | 'day'
  | 'days'
  | 'hour'
  | 'hours'
  | 'minute'
  | 'minutes'
  | 'second'
  | 'seconds';

/**
 * The format of output message.
 *
 * [MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/RelativeTimeFormat/RelativeTimeFormat#Parameters).
 *
 * [Specification](https://tc39.es/ecma402/#sec-InitializeRelativeTimeFormat).
 */
type RelativeTimeFormatNumeric = 'always' | 'auto';

/**
 * The length of the internationalized message.
 *
 * [MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/RelativeTimeFormat/RelativeTimeFormat#Parameters).
 *
 * [Specification](https://tc39.es/ecma402/#sec-InitializeRelativeTimeFormat).
 */
type RelativeTimeFormatStyle = 'long' | 'short' | 'narrow';

/**
 * An object with some or all of properties of `options` parameter
 * of `Intl.RelativeTimeFormat` constructor.
 *
 * [MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/RelativeTimeFormat/RelativeTimeFormat#Parameters).
 *
 * [Specification](https://tc39.es/ecma402/#sec-InitializeRelativeTimeFormat).
 */
export interface RelativeTimeFormatOptions {
  unit?: RelativeTimeFormatUnit;
  numeric?: RelativeTimeFormatNumeric;
  style?: RelativeTimeFormatStyle;
}

const RELATIVE_TIME_OPTIONS = ['numeric', 'style', 'unit'] as readonly (keyof RelativeTimeFormatOptions)[];

/**
 * @private
 * @hide
 */
export default class FormatRelative extends Formatter<RelativeTimeFormatOptions> {
  static readonly type = 'relative';

  createNativeFormatter = memoize((locales, options) => {
    // @ts-ignore `Intl.RelativeTimeFormat` will be added in TypeScript 4.0
    if (!Intl || !Intl.RelativeTimeFormat) {
      this.config.onError({
        kind: MISSING_INTL_API,
        error: new FormatError(
          `Intl.RelativeTimeFormat is not available in this environment.
  Try polyfilling it using "@formatjs/intl-relativetimeformat"
  `,
          MISSING_INTL_API
        ),
      });

      return;
    }

    // @ts-ignore `Intl.RelativeTimeFormat` will be added in TypeScript 4.0
    return new Intl.RelativeTimeFormat(locales, options);
  });

  get options() {
    return RELATIVE_TIME_OPTIONS;
  }

  format(
    locale: string | string[],
    value: ConstructorParameters<typeof Date>[0],
    formatOptions: RelativeTimeFormatOptions & BaseOptions
  ) {
    const formatterOptions = this.readOptions(formatOptions);

    this.validateFormatterOptions(locale, formatterOptions);
    const formatterInstance = this.createNativeFormatter(locale, formatterOptions);

    return formatterInstance.format(value, formatOptions.unit ?? formatterOptions.unit);
  }
}
