import IntlComponent from './main';

var FormatDateComponent = IntlComponent.extend({
	tagName:           'intl-date',
	instrumentDisplay: '{{intl-date}}',

	renderer: function (intl, props, options) {
		return intl.formatDate(props.value, options);
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
