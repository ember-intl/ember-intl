import IntlComponent from './main';

var FormatNumberComponent = IntlComponent.extend({
	instrumentDisplay: '{{format-number}}',
	style:    null,
	currency: null,

	layout: function (context, options) {
		var view    = options.data.view;
		var intl    = view.get('intl');
		var locales = view.get('locales');
		var props   = view.getProperties(view.propKeys);
		var formats = view.get('format') || FormatNumberComponent.filterFormatOptions(props);

		return intl.formatNumber(context.get('value'), {
			locales: locales,
			formats: formats
		});
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