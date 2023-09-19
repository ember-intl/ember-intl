/**
 * Copyright 2015, Yahoo! Inc.
 * Copyrights licensed under the New BSD License. See the accompanying LICENSE file for terms.
 */

import BaseHelper from './-format-base';

export default class THelper extends BaseHelper {
  format(key, options) {
    return this.intl.t(key, options);
  }
}
