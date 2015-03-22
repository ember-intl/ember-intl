/**
 * Copyright 2015, Yahoo! Inc.
 * Copyrights licensed under the New BSD License. See the accompanying LICENSE file for terms.
 */

import Ember from 'ember';
import Formatter from 'ember-intl/formatter-base';

var FormatRelative = Formatter.extend({
    format: function (value, hash) {
        var options = this.filterFormatOptions(hash);

        return this.get('intl').formatRelative(value, options, {
            now: hash.now
        });
    }
});

FormatRelative.reopenClass({
    formatOptions: Ember.A(['style', 'units'])
});

export default FormatRelative;
