/**
 * Copyright 2015, Yahoo! Inc.
 * Copyrights licensed under the New BSD License. See the accompanying LICENSE file for terms.
 */

import Ember from 'ember';

export function LiteralWrapper(value) {
  this.value = value;
}

export default Ember.Helper.extend({
  compute([translation]) {
    return new LiteralWrapper(translation);
  }
});
