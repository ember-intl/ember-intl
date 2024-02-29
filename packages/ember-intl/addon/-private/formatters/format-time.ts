import type { FormatDateOptions, IntlShape } from '@formatjs/intl';

import Formatter from './-base';

/**
 * @private
 * @hide
 */
export default class FormatTime extends Formatter<FormatDateOptions> {
  static readonly type = 'time';
  format(
    intl: IntlShape<string>,
    ...[value, opts]: Parameters<IntlShape<string>['formatTime']>
  ): string {
    return intl.formatTime(value, opts);
  }
}
