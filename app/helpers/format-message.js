import helperBase from 'ember-intl/helpers/base';

var get      = Ember.get;
var validKey = /[\w|.]/;

export var formatOptions = [
	'localeMatcher', 'timeZone', 'hour12', 'formatMatcher', 'weekday',
	'era', 'year', 'month', 'day', 'hour', 'minute', 'second',
	'timeZoneName'
];

export function extractICUKeys (msg) {
	var length = msg.length;
	var buf    = [], out = Ember.A();
	var i      = 0;
	var char, key;

	for (; i < length; i++) {
		char = msg[i];

		if (buf.length && !validKey.test(char)) {
			buf.shift();
			key = buf.join('');

			// do not include empty strings: {}
			if (key) { out.addObject(key); }

			buf = [];
		}
		else if (
				// does not include escaped curly braces
				// and double curly braces does not mistake the first
				// as the starting point of the key {{foo}} should return `foo`
				(char === '{' && msg[i-1] !== "\\" && msg[i+1] !== '{') ||
				buf.length
			)
		{
			buf.push(char);
		}
	}

	return out;
}

export default helperBase(formatOptions, function (intl, inputValue, options, hash) {
	var icuKeys      = extractICUKeys(inputValue);
	var contextProps = get(this, 'context').getProperties(icuKeys);
	var messageModel = Ember.$.extend(contextProps, hash);

	return intl.formatMessage(inputValue, messageModel, options);
});