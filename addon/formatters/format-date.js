/**
 * Copyright 2015, Yahoo! Inc.
 * Copyrights licensed under the New BSD License. See the accompanying LICENSE file for terms.
 */

import Ember from 'ember';
import computed from 'ember-new-computed';
import createFormatCache from 'intl-format-cache';
import Formatter from './-base';

function assertIsDate (date, errMsg) {
    Ember.assert(errMsg, isFinite(date));
}

let FormatDate = Formatter.extend({
    formatType: 'date',

    formatter: computed(() => {
        return createFormatCache(Intl.DateTimeFormat);
    }).readOnly(),

    format(value, options) {
        value = new Date(value);
        assertIsDate(value, 'A date or timestamp must be provided to format-date');
        return this._format(value, this.filterSupporedOptions(options));
    }
});

FormatDate.reopenClass({
    supportedOptions: [
        'localeMatcher', 'timeZone', 'hour12', 'formatMatcher', 'weekday',
        'era', 'year', 'month', 'day', 'hour', 'minute', 'second',
        'timeZoneName'
    ]
});

export default FormatDate;
