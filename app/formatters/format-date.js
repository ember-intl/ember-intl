/**
 * Copyright 2015, Yahoo! Inc.
 * Copyrights licensed under the New BSD License. See the accompanying LICENSE file for terms.
 */

import Ember from 'ember';
import Formatter from 'ember-intl/formatter-base';

var FormatDate = Formatter.extend({
    format: function (value, hash) {
        var args = this.buildOptions(value, hash);
        var intl = this.intl;

        return intl.formatDate.apply(intl, args);
    }
});

FormatDate.reopenClass({
    formatOptions: [
        'localeMatcher', 'timeZone', 'hour12', 'formatMatcher', 'weekday',
        'era', 'year', 'month', 'day', 'hour', 'minute', 'second',
        'timeZoneName'
    ]
});

export default FormatDate;
