import Ember from 'ember';

/*
 * Ember.HTMLBars._registerHelper the args are params, hash, options, env
 *
 * Handlebars: http://jsbin.com/tofajojosi/1/edit
 * HTMLBars:   http://jsbin.com/qopufe/1/edit
 */

var htmlbars = !!Ember.HTMLBars;

if (htmlbars) {
	throw new Error('HTMLBars is not yet supported.');
}

var helperCreator = function (EmberHandlebars, helperName, ComponentType) {
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
	}

	EmberHandlebars.registerHelper(helperName, fn);
}

export default helperCreator;
