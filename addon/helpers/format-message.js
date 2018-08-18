/**
 * Copyright 2015, Yahoo! Inc.
 * Copyrights licensed under the New BSD License. See the accompanying LICENSE file for terms.
 */

import { get } from '@ember/object';
import BaseHelper from './-format-base';

class MessageHelper extends BaseHelper {
  format(value, options) {
    return get(this, 'intl').formatMessage(value, options);
  }
}

export default MessageHelper;
