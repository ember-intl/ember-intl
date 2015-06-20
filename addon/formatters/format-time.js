/**
 * Copyright 2015, Yahoo! Inc.
 * Copyrights licensed under the New BSD License. See the accompanying LICENSE file for terms.
 */

import Ember from 'ember';
import Formatter from './-base';
import createFormatCache from '../format-cache/memoizer';
import computed from 'ember-new-computed';

function assertIsDate (date, errMsg) {
    Ember.assert(errMsg, isFinite(date));
}

var FormatTime = Formatter.extend({
    formatType: 'time',

    formatter: computed(() => {
        return createFormatCache(Intl.DateTimeFormat);
    }).readOnly(),

    format(value, options) {
        value = new Date(value);
        assertIsDate(value, 'A date or timestamp must be provided to format-time');
        let formatOptions = this.filterFormatOptions(options);
        return this._format(value, formatOptions);
    }
});

FormatTime.reopenClass({
    formatOptions: Ember.A([
        'localeMatcher', 'timeZone', 'hour12', 'formatMatcher', 'weekday',
        'era', 'year', 'month', 'day', 'hour', 'minute', 'second',
        'timeZoneName'
    ])
});

export default FormatTime;
