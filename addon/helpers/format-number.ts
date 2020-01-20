/**
 * Copyright 2015, Yahoo! Inc.
 * Copyrights licensed under the New BSD License. See the accompanying LICENSE file for terms.
 */

import BaseFormatHelper from './-format-base';
import { formatMessageOptions } from '../services/intl';

export default class FormatNumberHelper extends BaseFormatHelper<number, string, formatMessageOptions> {
  format(value: number, options: formatMessageOptions) {
    return this.intl.formatNumber(value, options);
  }
}
