/**
 * Copyright 2015, Yahoo! Inc.
 * Copyrights licensed under the New BSD License. See the accompanying LICENSE file for terms.
 */

import Ember from 'ember';
import helperFactory from './-base';

const { Helper } = Ember;

let RelativeHelper = helperFactory('relative');

if (Helper && Helper.detect(RelativeHelper)) {
    const runBind = Ember.run.bind;

    RelativeHelper = RelativeHelper.extend({
        compute(value, hash) {
            this.clearTimer();
            if (hash && hash.interval) {
                this.timer = setTimeout(runBind(this, this.recompute), parseInt(hash.interval, 10));
            }
            return this._super(value, hash);
        },
        clearTimer() {
            clearTimeout(this.timer);
        },
        destroy(...args) {
            this.clearTimer();
            this._super(...args);
        }
    });
}

export default RelativeHelper;
