/**
 * Copyright 2015, Yahoo! Inc.
 * Copyrights licensed under the New BSD License. See the accompanying LICENSE file for terms.
 */

import BaseHelper from './-format-base';

export default class FormatNumberHelper extends BaseHelper {
  format(value, options) {
    return this.intl.formatNumber(value, options);
  }
}
