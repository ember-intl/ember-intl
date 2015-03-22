/**
 * Copyright 2015, Yahoo! Inc.
 * Copyrights licensed under the New BSD License. See the accompanying LICENSE file for terms.
 */

import Ember from 'ember';
import Formatter from 'ember-intl/formatter-base';

var FormatDate = Formatter.extend({
    format: function (value, hash) {
        var options = this.filterFormatOptions(hash);
        return this.get('intl').formatDate(value, options);
    }
});

FormatDate.reopenClass({
    formatOptions: Ember.A([
        'localeMatcher', 'timeZone', 'hour12', 'formatMatcher', 'weekday',
        'era', 'year', 'month', 'day', 'hour', 'minute', 'second',
        'timeZoneName'
    ])
});

export default FormatDate;
