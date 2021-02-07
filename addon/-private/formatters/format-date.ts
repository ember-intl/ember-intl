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
export default class FormatDate extends Formatter<FormatDateOptions> {
  static readonly type = 'date';
  format(locale: string | string[], ...[value, opts]: Parameters<IntlShape<string>['formatDate']>): string {
    return this.getIntl(locale).formatDate(value, opts);
  }
}
