/**
* Copyright 2014, Yahoo! Inc.
* Copyrights licensed under the New BSD License. See the accompanying LICENSE file for terms.
*/

import Ember from 'ember';
import Formatter from '../formatter-base';

var FormatNumber = Formatter.extend({
	format: function (value, hash) {
		var formatOptions = {
			formats: hash.format || this.filterFormatOptions()
		};

		if (hash.locales) {
			formatOptions.locales = hash.locales;
		}

		return this.intl.formatNumber(value, formatOptions);
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
