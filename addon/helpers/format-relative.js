/**
 * Copyright 2015, Yahoo! Inc.
 * Copyrights licensed under the New BSD License. See the accompanying LICENSE file for terms.
 */

import Ember from 'ember';
import formatHelper from './-base';

let RelativeHelper = formatHelper('relative');

if (Ember.Helper && Ember.Helper.detect(RelativeHelper)) {
    const { later:runLater } = Ember.run;

    RelativeHelper = RelativeHelper.extend({
        compute(value, hash) {
            if (hash && hash.interval) {
                runLater(this, this.recompute, parseInt(hash.interval, 10));
            }
            return this._super(...arguments);
        }
    });
}

export default RelativeHelper;
