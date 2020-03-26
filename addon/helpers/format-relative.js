/**
 * Copyright 2015, Yahoo! Inc.
 * Copyrights licensed under the New BSD License. See the accompanying LICENSE file for terms.
 */

import BaseHelper from '../-private/helpers/-format-base';

export default BaseHelper.extend({
  format(params, hash) {
    return this.intl.formatRelative(params, hash);
  },

  compute(params, hash = {}) {
    return this._super(params, hash);
  },
});
