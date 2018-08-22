/**
 * Copyright 2015, Yahoo! Inc.
 * Copyrights licensed under the New BSD License. See the accompanying LICENSE file for terms.
 */

import { get } from '@ember/object';
import BaseHelper from './-format-base';

class NumberHelper extends BaseHelper {
  format(value, options) {
    return get(this, 'intl').formatNumber(value, options);
  }
}

export default NumberHelper;
