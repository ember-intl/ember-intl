/**
 * Copyright 2015, Yahoo! Inc.
 * Copyrights licensed under the New BSD License. See the accompanying LICENSE file for terms.
 */

import { FormatDateOptions, IntlShape } from '@formatjs/intl';
import Formatter from './-base';

/**
 * @private
 * @hide
 */
export default class FormatTime extends Formatter<FormatDateOptions> {
  static readonly type = 'time';
  format(locale: string | string[], ...[value, opts]: Parameters<IntlShape<string>['formatTime']>): string {
    return this.getIntl(locale).formatTime(value, opts);
  }
}
