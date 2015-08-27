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
        value = value == null ? null : new Date(value);
        assertIsDate(value, 'A date or timestamp must be provided to format-date');
        var filteredOpts = this.filterSupporedOptions(options);
        if(value || filteredOpts.allowEmpty === false){
          return this._format(value, filteredOpts);
        }
        else{
          return '';
        }
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
