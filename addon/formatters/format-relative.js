/**
 * Copyright 2015, Yahoo! Inc.
 * Copyrights licensed under the New BSD License. See the accompanying LICENSE file for terms.
 */

import Ember from 'ember';
import Formatter from './-base';
import createFormatCache from '../format-cache/memoizer';
import { IntlRelativeFormat } from 'ember-intl/utils/data';
import computed from 'ember-new-computed';

function assertIsDate (date, errMsg) {
    Ember.assert(errMsg, isFinite(date));
}

var FormatRelative = Formatter.extend({
    formatType: 'relative',

    formatter: computed(() => {
        return createFormatCache(IntlRelativeFormat);
    }).readOnly(),

    format(value, options) {
        value = new Date(value);
        options = options || {};
        assertIsDate(value, 'A date or timestamp must be provided to format-relative');
        let formatOptions = this.filterFormatOptions(options);

        return this._format(value, formatOptions, {
            now: options.now
        });
    }
});

FormatRelative.reopenClass({
    formatOptions: Ember.A(['style', 'units'])
});

export default FormatRelative;
