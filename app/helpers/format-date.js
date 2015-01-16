import helperBase from 'ember-intl/helpers/base';

var formatOptions = [
	'localeMatcher', 'timeZone', 'hour12', 'formatMatcher', 'weekday',
	'era', 'year', 'month', 'day', 'hour', 'minute', 'second',
	'timeZoneName'
];

export default helperBase(formatOptions, function (intl, inputValue, options, hash) {
	return intl.formatDate(inputValue, options);
});