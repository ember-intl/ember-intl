/**
 * Copyright 2015, Yahoo! Inc.
 * Copyrights licensed under the New BSD License. See the accompanying LICENSE file for terms.
 */

import { FormatRelativeTimeOptions, IntlShape } from '@formatjs/intl';
import { assert } from '@ember/debug';
import Formatter from './-base';

/**
 * An object with some or all of properties of `options` parameter
 * of `Intl.RelativeTimeFormat` constructor.
 *
 * [MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/RelativeTimeFormat/RelativeTimeFormat#Parameters).
 *
 * [Specification](https://tc39.es/ecma402/#sec-InitializeRelativeTimeFormat).
 */
export type RelativeTimeFormatOptions = FormatRelativeTimeOptions & {
  unit?: Parameters<IntlShape<string>['formatRelativeTime']>[1];
};

/**
 * @private
 * @hide
 */
export default class FormatRelative extends Formatter<RelativeTimeFormatOptions> {
  static readonly type = 'relative';

  format(
    intl: IntlShape<string>,
    value: Parameters<IntlShape<string>['formatRelativeTime']>[0],
    formatOptions: RelativeTimeFormatOptions
  ): string {
    assert(`[ember-intl] FormatRelative: Missing option`, formatOptions);

    const { format } = formatOptions;
    let unit = formatOptions.unit;
    let opts: RelativeTimeFormatOptions | undefined = formatOptions;
    if (!unit && format && intl.formats.relative && (opts = intl.formats.relative[format])) {
      unit = opts.unit;
    }

    assert(`[ember-intl] FormatRelative: 'formatOptions' are missing a 'unit'. ${JSON.stringify(formatOptions)}`, unit);

    return intl.formatRelativeTime(value, unit, opts);
  }
}
