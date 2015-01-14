import Ember from 'ember';
import createFormatCache from '../format-cache/memoizer';

var forEach   = Ember.EnumerableUtils.forEach;
var alias     = Ember.computed.alias;
var makeArray = Ember.makeArray;
var get       = Ember.get;

function assertIsNumber (num, errMsg) {
	Ember.assert(errMsg, typeof num === 'number');
}

function assertIsDate (date, errMsg) {
	Ember.assert(errMsg, isFinite(date));
}

export default Ember.Controller.extend({
	locales:           null,
	defaultLocales:    null,
	shimmed:           null,
	getDateTimeFormat: null,
	getRelativeFormat: null,
	getMessageFormat:  null,
	getNumberFormat:   null,

	current: Ember.computed('locales', 'defaultLocales', function () {
		return makeArray(get(this, 'locales'))
			.concat(makeArray(get(this, 'defaultLocales')))
			.uniq();
	}).readOnly(),

	setupMemoizers: Ember.on('init', function () {
		this.setProperties({
			getDateTimeFormat: createFormatCache(Intl.DateTimeFormat),
			getRelativeFormat: createFormatCache(IntlRelativeFormat),
			getNumberFormat:   createFormatCache(Intl.NumberFormat),
			getMessageFormat:  createFormatCache(IntlMessageFormat)
		});
	}),

	formats: Ember.computed(function () {
		var formats = this.container.resolver('formats:main');

		if (!formats) {
			Ember.Logger.warn('No `formats:main` module found.  Did you forget to export it?');
			return {};
		}

		return formats;
	}).readOnly(),

	lookupMessage: function (name) {
		return this.container.resolver('message:' + name);
	},

	messages: Ember.computed('current', function () {
		var messages = {};
		var locales  = get(this, 'current');

		if (Ember.isEmpty(locales)) {
			return;
		}

		locales.forEach(function (localeKey) {
			var locale = this.lookupMessage(localeKey) || this.lookupMessage(localeKey.split('-')[0]);

			for (var key in locale) {
				if (locale.hasOwnProperty(key) && !messages.hasOwnProperty(key)) {
					messages[key] = locale[key];
				}
			}
		}, this);

		return messages;
	}),

	addLocaleData: function (data) {
		Ember.assert('IntlMessageFormat has not yet been loaded',  IntlMessageFormat);
		Ember.assert('IntlRelativeFormat has not yet been loaded', IntlRelativeFormat);

		IntlMessageFormat.__addLocaleData(data);
		IntlRelativeFormat.__addLocaleData(data);
	},

	formatRelative: function (date, options) {
		date = new Date(date);
		assertIsDate(date, 'A date or timestamp must be provided to formatRelative()');

		return this._format('relative', date, options);
	},

	formatMessage: function (message, values, options) {
		// When `message` is a function, assume it's an IntlMessageFormat
		// instance's `format()` method passed by reference, and call it. This
		// is possible because its `this` will be pre-bound to the instance.
		if (typeof message === 'function') {
			return message(values);
		}

		options = options || {};

		var locales = makeArray(options.locales);
		var formats = options.formats || get(this, 'formats');

		if (Ember.isEmpty(locales)) {
			locales = get(this, 'current');
		}

		if (typeof message === 'string') {
			message = this.getMessageFormat(message, locales, formats);
		}

		return message.format(values);
	},

	formatTime: function (date, options) {
		date = new Date(date);
		assertIsDate(date, 'A date or timestamp must be provided to formatTime()');

		return this._format('time', date, options);
	},

	formatDate: function (date, options) {
		date = new Date(date);
		assertIsDate(date, 'A date or timestamp must be provided to formatDate()');

	  return this._format('date', date, options);
	},

	formatNumber: function (num, options) {
		assertIsNumber(num, 'A number must be provided to formatNumber()');

		return this._format('number', num, options);
	},

	_format: function (type, value, options) {
		options = options || {};

		var locales = makeArray(options.locales);
		var formats = get(this, 'formats');

		if (Ember.isEmpty(locales)) {
			locales = get(this, 'current');
		}

		if (typeof options.formats === 'string') {
			options = get(this, 'formats.' + type + '.' + options.formats);
		} else if (typeof options.formats === 'object') {
			options = options.formats;
		}

		if (typeof options === 'string') {
			try {
				options = formats[type][options];
			} catch (e) {
				options = undefined;
			} finally {
				if (options === undefined) {
					throw new ReferenceError('No ' + type + ' format named: ' + options);
				}
			}
		}

		switch (type) {
			case 'date':
			case 'time':
				return this.getDateTimeFormat(locales, options).format(value);
			case 'number':
				return this.getNumberFormat(locales, options).format(value);
			case 'relative':
				return this.getRelativeFormat(locales, options).format(value);
			default:
				throw new Error('Unrecognized simple format type: ' + type);
		}
	}
});
