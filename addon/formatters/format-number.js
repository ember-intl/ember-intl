/**
 * Copyright 2015, Yahoo! Inc.
 * Copyrights licensed under the New BSD License. See the accompanying LICENSE file for terms.
 */

import Ember from 'ember';
import Formatter from './-base';
import createFormatCache from '../format-cache/memoizer';
import computed from 'ember-new-computed';

var FormatNumber = Formatter.extend({
    formatType: 'number',

    formatter: computed(() => {
        return createFormatCache(Intl.NumberFormat);
    }).readOnly(),

    format(value, options) {
        var formatOptions = this.filterFormatOptions(options);
        return this._format(value, formatOptions);
    }
});

FormatNumber.reopenClass({
    formatOptions: Ember.A([
        'localeMatcher', 'style', 'currency', 'currencyDisplay',
        'useGrouping', 'minimumIntegerDigits', 'minimumFractionDigits',
        'maximumFractionDigits', 'minimumSignificantDigits',
        'maximumSignificantDigits'
    ])
});

export default FormatNumber;
