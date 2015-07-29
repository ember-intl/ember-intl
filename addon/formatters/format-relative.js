/**
 * Copyright 2015, Yahoo! Inc.
 * Copyrights licensed under the New BSD License. See the accompanying LICENSE file for terms.
 */

import Ember from 'ember';
import computed from 'ember-new-computed';
import IntlRelativeFormat from 'intl-relativeformat';
import createFormatCache from 'intl-format-cache';
import Formatter from './-base';

function assertIsDate (date, errMsg) {
    Ember.assert(errMsg, isFinite(date));
}

let FormatRelative = Formatter.extend({
    formatType: 'relative',

    formatter: computed({
        get() {
            return createFormatCache(IntlRelativeFormat);
        }
    }),

    format(value, options = {}) {
        value = new Date(value);
        assertIsDate(value, 'A date or timestamp must be provided to format-relative');
        return this._format(value, this.filterSupporedOptions(options), {
            now: options.now
        });
    }
});

FormatRelative.reopenClass({
    supportedOptions: ['style', 'units']
});

export default FormatRelative;
