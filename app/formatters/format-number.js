/**
 * Copyright 2015, Yahoo! Inc.
 * Copyrights licensed under the New BSD License. See the accompanying LICENSE file for terms.
 */

import Ember from 'ember';
import Formatter from 'ember-intl/formatter-base';

var FormatNumber = Formatter.extend({
    format: function (value, hash) {
        var args = this.buildOptions(value, hash);
        var intl = this.intl;

        return intl.formatNumber.apply(intl, args);
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
