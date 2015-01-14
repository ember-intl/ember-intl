import IntlComponent from './main';

var FormatNumberComponent = IntlComponent.extend({
	tagName:           'format-number',
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