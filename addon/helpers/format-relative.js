/**
 * Copyright 2015, Yahoo! Inc.
 * Copyrights licensed under the New BSD License. See the accompanying LICENSE file for terms.
 */

import Ember from 'ember';
import BaseHelper from '../helper';

const runBind = Ember.run.bind;

export default BaseHelper.extend({
  format(params, hash) {
    return this.intl.formatRelative(params, hash);
  },

  compute(params, hash) {
    this.clearTimer();

    if (hash && typeof hash.interval !== 'undefined') {
      /* setTimeout versus Ember.run.later so tests will not wait infinitely */
      this.timer = setTimeout(runBind(this, this.recompute), parseInt(hash.interval, 10));
    }

    return this._super(params, hash);
  },

  clearTimer() {
    clearTimeout(this.timer);
  },

  willDestroy() {
    this._super();

    this.clearTimer();
  }
});
