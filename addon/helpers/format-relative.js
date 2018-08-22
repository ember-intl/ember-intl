/**
 * Copyright 2015, Yahoo! Inc.
 * Copyrights licensed under the New BSD License. See the accompanying LICENSE file for terms.
 */

import { get } from '@ember/object';
import { bind } from '@ember/runloop';
import BaseHelper from './-format-base';

const runBind = bind;

class RelativeHelper extends BaseHelper {
  format(/* params, hash */) {
    return get(this, 'intl').formatRelative(...arguments);
  }

  compute(_, hash) {
    this.clearTimer();

    if (hash && typeof hash.interval !== 'undefined') {
      /* setTimeout versus Ember.run.later so tests will not wait infinitely */
      this.timer = setTimeout(runBind(this, this.recompute), parseInt(hash.interval, 10));
    }

    return super.compute(...arguments);
  }

  clearTimer() {
    clearTimeout(this.timer);
  }

  willDestroy() {
    super.willDestroy(...arguments);

    this.clearTimer();
  }
}

export default RelativeHelper;
