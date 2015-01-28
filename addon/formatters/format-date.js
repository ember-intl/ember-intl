/**
 * Copyright 2015, Yahoo! Inc.
 * Copyrights licensed under the New BSD License. See the accompanying LICENSE file for terms.
 */

import Ember from 'ember';
import Formatter from '../formatter-base';

var FormatDate = Formatter.extend({
	format: function (value, hash) {
		var formatOptions = {
			formats: hash.format || this.filterFormatOptions(hash)
		};

		if (hash.locales) {
			formatOptions.locales = hash.locales;
		}

		return this.intl.formatDate(value, formatOptions);
	}
});

FormatDate.reopenClass({
	formatOptions: [
		'localeMatcher', 'timeZone', 'hour12', 'formatMatcher', 'weekday',
		'era', 'year', 'month', 'day', 'hour', 'minute', 'second',
		'timeZoneName'
	]
});

export default FormatDate;
