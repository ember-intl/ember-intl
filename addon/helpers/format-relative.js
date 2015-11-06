/**
 * Copyright 2015, Yahoo! Inc.
 * Copyrights licensed under the New BSD License. See the accompanying LICENSE file for terms.
 */

import Ember from 'ember';
import helperFactory from './-base';

let RelativeHelper = helperFactory('relative');

const runBind = Ember.run.bind;

export default RelativeHelper.extend({
  compute(value, hash) {
    this.clearTimer();

    if (hash && typeof hash.interval !== 'undefined') {
      this.timer = setTimeout(runBind(this, this.recompute), parseInt(hash.interval, 10));
    }

    return this._super(...arguments);
  },

  clearTimer() {
    clearTimeout(this.timer);
  },

  destroy(...args) {
    this.clearTimer();
    this._super(...args);
  }
});
