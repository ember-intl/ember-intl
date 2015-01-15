import IntlBase from './main';

var IntlTime = IntlBase.extend({
	tagName:           'intl-time',
	instrumentDisplay: '{{intl-time}}',

	renderer: function (intl, props, options) {
		return intl.formatTime(props.value, options);
	}
});

IntlTime.reopenClass({
	formatOptions: [
		'localeMatcher', 'timeZone', 'hour12', 'formatMatcher', 'weekday',
		'era', 'year', 'month', 'day', 'hour', 'minute', 'second',
		'timeZoneName'
	]
});

export default IntlTime;
