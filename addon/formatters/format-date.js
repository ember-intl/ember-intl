import Ember from 'ember';
import Formatter from '../formatter-base';

var FormatDate = Formatter.extend({
	render: function (params, hash, options, env) {
		var formatOptions = {
			formats: hash.format || this.filterFormatOptions()
		};

		if (hash.locales) {
			formatOptions.locales = hash.locales;
		}

		return this.intl.formatDate(params[0], formatOptions);
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
