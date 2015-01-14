import IntlComponent from './main';

var FormatRelativeComponent = IntlComponent.extend({
	instrumentDisplay: '{{format-relative}}',

	layout: function (context, options) {
		var view    = options.data.view;
		var intl    = view.get('intl');
		var locales = view.get('locales');
		var props   = view.getProperties(view.propKeys);
		var formats = view.get('format') || FormatRelativeComponent.filterFormatOptions(props);

		return intl.formatRelative(context.get('value'), {
			locales: locales,
			formats: formats
		});
	}
});

FormatRelativeComponent.reopenClass({
	formatOptions: [
		'style', 'units'
	]
});

export default FormatRelativeComponent;
