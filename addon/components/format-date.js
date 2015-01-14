import IntlComponent from './main';

var FormatDateComponent = IntlComponent.extend({
	tagName:           'format-date',
	instrumentDisplay: '{{format-date}}',

	renderer: function (props, options) {
		return this.get('intl').formatDate(props.value, options);
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
