/**
 * Copyright 2015, Yahoo! Inc.
 * Copyrights licensed under the New BSD License. See the accompanying LICENSE file for terms.
 */

import Ember from 'ember';
import computed from 'ember-new-computed';
import createFormatCache from 'intl-format-cache';
import Formatter from './-base';

const { assert } = Ember;

function assertIsDate (date, errMsg) {
    assert(errMsg, isFinite(date));
}

const FormatDate = Formatter.extend({
    formatType: 'date',

    formatter: computed({
        get() {
            return createFormatCache(Intl.DateTimeFormat);
        }
    }),

    format(value, options) {
        // reading a stream where the value is null returns
        // undefined.  so, we need to work around this by setting it
        // to null.  this condition below can go away once we drop < 1.13 support
        if (typeof value === 'undefined') {
            value = null;
        }

        let dateTime = new Date(value);
        assertIsDate(dateTime, 'A date or timestamp must be provided to format-date');
        let formatOptions = this.filterSupporedOptions(options);

        return this._format(dateTime, formatOptions);
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
