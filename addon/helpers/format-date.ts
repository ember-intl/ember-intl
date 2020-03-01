/**
 * Copyright 2015, Yahoo! Inc.
 * Copyrights licensed under the New BSD License. See the accompanying LICENSE file for terms.
 */

import BaseHelper from './-format-base';

export default BaseHelper.extend({
  allowEmpty: true,

  format(value, options) {
    return this.intl.formatDate(value, options);
  }
});
