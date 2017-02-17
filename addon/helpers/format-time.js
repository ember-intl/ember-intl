/**
 * Copyright 2015, Yahoo! Inc.
 * Copyrights licensed under the New BSD License. See the accompanying LICENSE file for terms.
 */
import BaseHelper from '../helper';

export default BaseHelper.extend({
  format(value, options) {
    return this.intl.formatTime(value, options);
  }
});
