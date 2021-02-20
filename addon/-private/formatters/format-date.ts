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
  format(intl: IntlShape<string>, ...[value, opts]: Parameters<IntlShape<string>['formatDate']>): string {
    return intl.formatDate(value, opts);
  }
}
