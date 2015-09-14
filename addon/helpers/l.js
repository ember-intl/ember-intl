/**
 * Copyright 2015, Yahoo! Inc.
 * Copyrights licensed under the New BSD License. See the accompanying LICENSE file for terms.
 */

import Ember from 'ember';

let LiteralHelper;

export function LiteralWrapper(value) {
  this.value = value;
}

function compute(params) {
  return new LiteralWrapper(params[0]);
}

if (Ember.Helper) {
  LiteralHelper = Ember.Helper.extend({
    compute: compute
  });
}
else {
  LiteralHelper = compute;
}

export default LiteralHelper;
