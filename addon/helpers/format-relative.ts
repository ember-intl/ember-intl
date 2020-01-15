/**
 * Copyright 2015, Yahoo! Inc.
 * Copyrights licensed under the New BSD License. See the accompanying LICENSE file for terms.
 */

import { bind as runBind } from '@ember/runloop';
import BaseFormatHelper from './-format-base';
import { FormatterOptions } from '../-private/formatters/-base';
import { Dateish } from '../-private/formatters/format-date';

export default class FormatRelativeHelper extends BaseFormatHelper<number> {
  timer?: number;

  format(value: Dateish, options: FormatterOptions) {
    return this.intl.formatRelative(value, options);
  }

  compute(params: any[], hash: { interval?: string }) {
    this.clearTimer();

    if (typeof hash.interval !== 'undefined') {
      /* setTimeout versus Ember.run.later so tests will not wait infinitely */
      this.timer = window.setTimeout(runBind(this, this.recompute), parseInt(hash.interval, 10));
    }

    return super.compute(params, hash);
  }

  clearTimer() {
    clearTimeout(this.timer);
  }

  willDestroy() {
    super.willDestroy();

    this.clearTimer();
  }
}
