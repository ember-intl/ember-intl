/**
 * Copyright 2015, Yahoo! Inc.
 * Copyrights licensed under the New BSD License. See the accompanying LICENSE file for terms.
 */

import Ember from 'ember';
import Formatter from 'ember-intl/formatter-base';

var FormatTime = Formatter.extend({
    format: function (value, hash) {
        var args = this.buildOptions(value, hash);
        var intl = this.intl;

        return intl.formatTime.apply(intl, args);
    }
});

FormatTime.reopenClass({
    formatOptions: [
        'localeMatcher', 'timeZone', 'hour12', 'formatMatcher', 'weekday',
        'era', 'year', 'month', 'day', 'hour', 'minute', 'second',
        'timeZoneName'
    ]
});

export default FormatTime;
