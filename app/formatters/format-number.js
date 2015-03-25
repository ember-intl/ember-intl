/**
 * Copyright 2015, Yahoo! Inc.
 * Copyrights licensed under the New BSD License. See the accompanying LICENSE file for terms.
 */

import Ember from 'ember';
import Formatter from 'ember-intl/formatter-base';

var FormatNumber = Formatter.extend({
    format: function (value, hash) {
        var options = this.filterFormatOptions(hash);
        return this.get('intl').formatNumber(value, options);
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
