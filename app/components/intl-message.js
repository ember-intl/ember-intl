import Ember from 'ember';
import IntlBase from './main';

var computed = Ember.computed;
var alias    = computed.alias;
var get      = Ember.get;
var validKey = /[\w|.]/;

var IntlMessage = IntlBase.extend({
	instrumentDisplay: '{{intl-message}}',

	model:      null,
	messageKey: null,

	value:   computed.alias('message'),

	message: computed('messageKey', 'intl.messages', function () {
		var key = get(this, 'messageKey');

		if (!Ember.isBlank(key)) {
			var msg = get(this, 'intl.messages.' + key);
			Ember.assert('No message was discovered on key: ' + key, msg);
			return msg;
		}
	}),

	pojoContext: computed('model', 'value', function () {
		var model   = get(this, 'model') || {};
		var message = get(this, 'value');
		var keys    = this.getICUKeys(message);
		var out     = Ember.create(null);
		var length  = keys.length;
		var i       = 0;
		var key, value;

		for (; i < length; i++) {
			key = keys[i];

			// TODO (bug): Prevent collision by moving input
			// args on to a seperate object at the helper-level.
			//
			// For example, if decided to pass:
			//
			// {{intl-message pojoContext='oops'}}
			//
			// This is in the pipeline for Ember 2.0 to take the
			// same approach as React and put them on a `props` object
			value = get(model, key);

			if (typeof modelValue === 'undefined') {
				value = get(this, key);
			}

			out[keys[i]] = value;
		}

		return out;
	}).volatile(),

	/**
	* Parses ICU syntax and returns all of the keys out
	* into an array.
	*
	* Example input:
	* {product} will cost {price, number, EUR}
	*
	* Output: [ product, price ]
	*
	* @method getICUKeys
	* @param {String} message
	* @return {Array} Returns an array of strings
	*/
	getICUKeys: function (msg) {
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

	renderer: function (intl, inputValue, options) {
		return intl.formatMessage(inputValue, this.get('pojoContext'), options);
	}
});

export default IntlMessage;
