import IntlComponent from './main';

var FormatDateComponent = IntlComponent.extend({
	instrumentDisplay: '{{format-date}}',
	day:   null,
	month: null,
	year:  null,

	layout: function (context, options) {
		var view    = options.data.view;
		var intl    = view.get('intl');
		var locales = view.get('locales');
		var props   = view.getProperties(view.propKeys);
		var formats = view.get('format') || FormatDateComponent.filterFormatOptions(props);

		return intl.formatDate(context.get('value'), {
			locales: locales,
			formats: formats
		});
	}
});

FormatDateComponent.reopenClass({
	formatOptions: [
		'localeMatcher', 'timeZone', 'hour12', 'formatMatcher', 'weekday',
		'era', 'year', 'month', 'day', 'hour', 'minute', 'second',
		'timeZoneName'
	]
});

export default FormatDateComponent;
