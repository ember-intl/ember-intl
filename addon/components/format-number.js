import IntlComponent from './main';

var FormatNumberComponent = IntlComponent.extend({
	instrumentDisplay: '{{format-number}}',

	renderer: function (props, options) {
		return this.get('intl').formatNumber(props.value, options);
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