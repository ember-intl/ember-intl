/**
 * Copyright 2015, Yahoo! Inc.
 * Copyrights licensed under the New BSD License. See the accompanying LICENSE file for terms.
 */

import Ember from 'ember';
import BaseHelper from './-format-base';

const runBind = Ember.run.bind;

export default BaseHelper.extend({
  format(value, options) {
    return this.intl.formatRelative(value, options);
  },

  compute(value, hash) {
    this.clearTimer();

    if (hash && typeof hash.interval !== 'undefined') {
      /* setTimeout versus Ember.run.later so tests will not wait infinitely */
      this.timer = setTimeout(runBind(this, this.recompute), parseInt(hash.interval, 10));
    }

    return this._super(...arguments);
  },

  clearTimer() {
    clearTimeout(this.timer);
  },

  destroy(...args) {
    this._super(...args);

    this.clearTimer();
  }
});
