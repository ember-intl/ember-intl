/**
 * Copyright 2015, Yahoo! Inc.
 * Copyrights licensed under the New BSD License. See the accompanying LICENSE file for terms.
 */

import { get } from '@ember/object';
import { bind } from '@ember/runloop';
import BaseHelper from './-base';

const runBind = bind;

export default BaseHelper.extend({
  format(params, hash) {
    return get(this, 'intl').formatRelative(params, hash);
  },

  compute(params, hash) {
    this.clearTimer();

    if (hash && typeof hash.interval !== 'undefined') {
      /* setTimeout v. Ember.run.later so tests will not wait indefinitely for the runloop queue to clear */
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
