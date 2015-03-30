/**
 * Copyright 2015, Yahoo! Inc.
 * Copyrights licensed under the New BSD License. See the accompanying LICENSE file for terms.
 */

import Ember from 'ember';
import Formatter from './-base';
import createFormatCache from '../format-cache/memoizer';
import { IntlRelativeFormat } from 'ember-intl/utils/data';

function assertIsDate (date, errMsg) {
    Ember.assert(errMsg, isFinite(date));
}

var FormatRelative = Formatter.extend({
    formatType: 'relative',

    formatter: Ember.computed(function () {
        return createFormatCache(IntlRelativeFormat);
    }).readOnly(),

    format: function (datetime, options) {
        datetime = new Date(datetime);
        options = options || {};
        assertIsDate(datetime, 'A date or timestamp must be provided to format-relative');
        var formatOptions = this.filterFormatOptions(options);

        return this._format(datetime, formatOptions, {
            now: options.now
        });
    }
});

FormatRelative.reopenClass({
    formatOptions: Ember.A(['style', 'units'])
});

export default FormatRelative;
