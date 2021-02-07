/**
 * Copyright 2015, Yahoo! Inc.
 * Copyrights licensed under the New BSD License. See the accompanying LICENSE file for terms.
 */

import { FormatNumberOptions, IntlShape } from '@formatjs/intl';
import Formatter from './-base';

/**
 * @private
 * @hide
 */
export default class FormatNumber extends Formatter<FormatNumberOptions> {
  static readonly type = 'number';
  format(locale: string | string[], ...[value, opts]: Parameters<IntlShape<string>['formatNumber']>): string {
    return this.getIntl(locale).formatNumber(value, opts);
  }
}
