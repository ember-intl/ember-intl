import IntlComponent from './main';

var FormatTimeComponent = IntlComponent.extend({
	instrumentDisplay: '{{format-time}}',

	layout: function (context, options) {
		var view    = options.data.view;
		var intl    = view.get('intl');
		var locales = view.get('locales');
		var props   = view.getProperties(view.propKeys);
		var formats = view.get('format') || FormatTimeComponent.filterFormatOptions(props);

		return intl.formatTime(context.get('value'), {
			locales: locales,
			formats: formats
		});
	}
});

FormatTimeComponent.reopenClass({
	formatOptions: [
		'localeMatcher', 'timeZone', 'hour12', 'formatMatcher', 'weekday',
		'era', 'year', 'month', 'day', 'hour', 'minute', 'second',
		'timeZoneName'
	]
});

export default FormatTimeComponent;
