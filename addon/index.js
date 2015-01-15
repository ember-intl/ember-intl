import Ember from 'ember';
import IntlHTMLMessage from './components/intl-html-message';
import IntlRelative from './components/intl-relative';
import IntlMessage from './components/intl-message';
import IntlNumber from './components/intl-number';
import IntlTime from './components/intl-time';
import IntlDate from './components/intl-date';

var htmlbars = !!Ember.HTMLBars;

if (htmlbars) {
	throw new Error('HTMLBars is not yet supported.');
}

var createHelper = function (EmberHandlebars, helperName, ComponentType) {
	var fn = function (/* values .. , options */) {
		var args    = Array.prototype.slice.call(arguments);
		var options = args[args.length - 1];
		var value, view;

		if (args.length > 1) {
			value = args[0];
			view  = options.data.view;

			if (typeof value === 'string' &&
				(options.hashTypes[value] === 'ID' ||
				(options.types && options.types[0] === 'ID'))) {
				options.hash.valueBinding = view.getStream(value);
			} else {
				options.hash.value = value;
			}
		}

		options.hash.propKeys = Ember.A(Ember.keys(options.hash));

		return EmberHandlebars.helpers.view.call(this, ComponentType, options);
	};

	EmberHandlebars.registerHelper(helperName, fn);
};

/**
	Creates a handlebar helper for each of the intl components.
	@method register
	@param {EmberHandlebars} Ember Handlebars object
*/
export function register () {
	createHelper(Ember.Handlebars, 'intl-html-message', IntlHTMLMessage);
	createHelper(Ember.Handlebars, 'intl-relative',     IntlRelative);
	createHelper(Ember.Handlebars, 'intl-message',      IntlMessage);
	createHelper(Ember.Handlebars, 'intl-number',       IntlNumber);
	createHelper(Ember.Handlebars, 'intl-time',         IntlTime);
	createHelper(Ember.Handlebars, 'intl-date',         IntlDate);
}

export default register;
