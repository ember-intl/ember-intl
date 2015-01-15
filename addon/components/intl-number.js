import IntlBase from './main';

var IntlNumber = IntlBase.extend({
	tagName:           'intl-number',
	instrumentDisplay: '{{intl-number}}',

	renderer: function (intl, inputValue, options) {
		return intl.formatNumber(inputValue, options);
	}
});

IntlNumber.reopenClass({
	formatOptions: [
		'localeMatcher', 'style', 'currency', 'currencyDisplay',
		'useGrouping', 'minimumIntegerDigits', 'minimumFractionDigits',
		'maximumFractionDigits', 'minimumSignificantDigits',
		'maximumSignificantDigits'
	]
});

export default IntlNumber;
