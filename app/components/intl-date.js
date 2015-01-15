import IntlBase from './main';

var IntlDate = IntlBase.extend({
	instrumentDisplay: '{{intl-date}}',

	renderer: function (intl, inputValue, options) {
		return intl.formatDate(inputValue, options);
	}
});

IntlDate.reopenClass({
	formatOptions: [
		'localeMatcher', 'timeZone', 'hour12', 'formatMatcher', 'weekday',
		'era', 'year', 'month', 'day', 'hour', 'minute', 'second',
		'timeZoneName'
	]
});

export default IntlDate;
