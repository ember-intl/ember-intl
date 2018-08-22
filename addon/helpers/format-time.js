/**
 * Copyright 2015, Yahoo! Inc.
 * Copyrights licensed under the New BSD License. See the accompanying LICENSE file for terms.
 */
import { get } from '@ember/object';
import BaseHelper from './-format-base';

class TimeHelper extends BaseHelper {
  format(value, options) {
    return get(this, 'intl').formatTime(value, options);
  }
}

export default TimeHelper;
