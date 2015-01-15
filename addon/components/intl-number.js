import IntlComponent from './main';

var FormatNumberComponent = IntlComponent.extend({
	tagName:           'intl-number',
	instrumentDisplay: '{{intl-number}}',

	renderer: function (intl, props, options) {
		return intl.formatNumber(props.value, options);
	}
});

FormatNumberComponent.reopenClass({
	formatOptions: [
		'localeMatcher', 'style', 'currency', 'currencyDisplay',
		'useGrouping', 'minimumIntegerDigits', 'minimumFractionDigits',
		'maximumFractionDigits', 'minimumSignificantDigits',
		'maximumSignificantDigits'
	]
});

export default FormatNumberComponent;
