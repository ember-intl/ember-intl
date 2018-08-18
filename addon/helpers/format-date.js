/**
 * Copyright 2015, Yahoo! Inc.
 * Copyrights licensed under the New BSD License. See the accompanying LICENSE file for terms.
 */

import { get } from '@ember/object';
import BaseHelper from './-format-base';

class DateHelper extends BaseHelper {
  allowEmpty = true;

  format(value, options) {
    return get(this, 'intl').formatDate(value, options);
  }
}

export default DateHelper;
