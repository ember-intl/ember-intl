/**
* Copyright 2014, Yahoo! Inc.
* Copyrights licensed under the New BSD License. See the accompanying LICENSE file for terms.
*/

import Ember from 'ember';
import Formatter from '../formatter-base';

var validKey = /[\w|.]/;

var FormatMessage = Formatter.extend({
	extractICUKeys: function (msg) {
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
	},

	format: function (value, hash, context) {
		var icuKeys = this.extractICUKeys(value);
		var model;

		if (icuKeys && icuKeys.length) {
			model = Ember.$.extend(Ember.getProperties(context, icuKeys), hash);
		}

		var formatOptions = {
			formats: hash.format || this.filterFormatOptions()
		};

		if (hash.locales) {
			formatOptions.locales = hash.locales;
		}

		return this.intl.formatMessage(value, model, formatOptions);
	}
});

FormatMessage.reopenClass({
	formatOptions: [
		'localeMatcher', 'timeZone', 'hour12', 'formatMatcher', 'weekday',
		'era', 'year', 'month', 'day', 'hour', 'minute', 'second',
		'timeZoneName'
	]
});

export default FormatMessage;
