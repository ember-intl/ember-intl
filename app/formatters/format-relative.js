/**
 * Copyright 2015, Yahoo! Inc.
 * Copyrights licensed under the New BSD License. See the accompanying LICENSE file for terms.
 */

import Ember from 'ember';
import Formatter from 'ember-intl/formatter-base';

var FormatRelative = Formatter.extend({
    format: function (value, hash) {
        var args = this.buildOptions(value, hash);
        var intl = this.intl;

        return intl.formatRelative.apply(intl, args);
    }
});

FormatRelative.reopenClass({
    formatOptions: Ember.A(['style', 'units'])
});

export default FormatRelative;
