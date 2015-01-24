var Blueprint   = require('ember-cli/lib/models/blueprint');
var SilentError = require('ember-cli/lib/errors/silent');
var extract     = require('../../lib/extract');
var serialize   = require('serialize-javascript');

module.exports = {
	description: 'Extract a CLDR data into an ES6 module for a given locale code',

	anonymousOptions: [
		'plurals',
		'fields'
	],

	normalizeEntityName: function (localeName) {
		entityName = Blueprint.prototype.normalizeEntityName.apply(this, arguments);

		if (!this.validLocale(this.normalizeLocaleName(localeName))) {
			throw new SilentError('Aborting. `' + localeName + '` is not a know locale code');
		}

		return localeName;
	},

	validLocale: function (localeName) {
		return extract.isValidLocale(localeName);
	},

	normalizeLocaleName: function (localeName) {
		return localeName.toLowerCase().replace('-', '_');
	},

	extract: function (locale, settings) {
		settings = settings || {};

		var data = { locale: locale };

		if (settings.plurals) {
			var pluralRuleFunction = extract.pluralRuleFunction(this.normalizeLocaleName(locale));


			if (pluralRuleFunction) {
				data.pluralRuleFunction = pluralRuleFunction;
			} else {
				return null;
			}
		}

		if (settings.fields) {
			var fields = extract.fields(this.normalizeLocaleName(locale), settings.fields);
			if (fields && Object.keys(fields).length) {
				data.fields = fields;
			} else {
				return null;
			}
		}

		return data;
	},

	locals: function (options) {
		var localeName = options.args[1];
		var plural = options.args[2];

		if (typeof plural === 'undefined') {
			plural = true;
		}

		var fields = options.args.slice(3);

		if (!fields.length)  {
			fields = ['year', 'month', 'day', 'hour', 'minute', 'second'];
		}

		var cldr = this.extract(localeName, {
			plurals: plural,
			fields:  fields
		});

		return {
			locale: '"'+ localeName + '"',
			fields: serialize(cldr.fields) || {},
			pluralRuleFunction: serialize(cldr.pluralRuleFunction)
		}
	}
};