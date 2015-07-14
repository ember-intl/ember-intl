/**
 * Copyright 2015, Yahoo! Inc.
 * Copyrights licensed under the New BSD License. See the accompanying LICENSE file for terms.
 */

import createFormatCache from 'intl-format-cache';
import computed from 'ember-new-computed';
import Formatter from './-base';

var FormatNumber = Formatter.extend({
    formatType: 'number',

    formatter: computed(() => {
        return createFormatCache(Intl.NumberFormat);
    }).readOnly(),

    format(value, options) {
        return this._format(value, this.filterWhitelistedOptions(options));
    }
});

FormatNumber.reopenClass({
    formatOptions: [
        'localeMatcher', 'style', 'currency', 'currencyDisplay',
        'useGrouping', 'minimumIntegerDigits', 'minimumFractionDigits',
        'maximumFractionDigits', 'minimumSignificantDigits',
        'maximumSignificantDigits'
    ]
});

export default FormatNumber;
