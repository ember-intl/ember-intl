import type { FormatListOptions, IntlShape } from '@formatjs/intl';

import Formatter from './-base';

/**
 * @private
 * @hide
 */
export default class FormatList extends Formatter<FormatListOptions> {
  static readonly type = 'list';
  format(
    intl: IntlShape<string>,
    ...[value, opts]: Parameters<IntlShape<string>['formatList']>
  ): string {
    return intl.formatList(value, opts);
  }
}
