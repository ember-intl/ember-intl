import Ember from 'ember';
import helperBase from 'ember-intl/helpers/base';

var formatOptions = [
	'localeMatcher', 'style', 'currency', 'currencyDisplay',
	'useGrouping', 'minimumIntegerDigits', 'minimumFractionDigits',
	'maximumFractionDigits', 'minimumSignificantDigits',
	'maximumSignificantDigits'
];

export default helperBase(formatOptions, function (intl, inputValue, options, hash) {
	return intl.formatNumber(inputValue, options);
});