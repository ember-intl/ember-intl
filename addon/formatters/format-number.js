import Ember from 'ember';
import Formatter from '../formatter-base';

var FormatNumber = Formatter.extend({
	render: function (params, hash, options, env) {
		var formatOptions = {
			formats: hash.format || this.filterFormatOptions()
		};

		if (hash.locales) {
			formatOptions.locales = hash.locales;
		}

		return this.intl.formatNumber(params[0], formatOptions);
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
