/*
 * Copyright 2015, Yahoo! Inc.
 * Copyrights licensed under the New BSD License. See the accompanying LICENSE file for terms.
 */

import Helper from '@ember/component/helper';

export function LiteralWrapper(value) {
  this.value = value;
}

export default Helper.extend({
  compute([translation]) {
    return new LiteralWrapper(translation);
  }
});
