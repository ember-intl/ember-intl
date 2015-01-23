import Ember from 'ember';
import env from '../config/environment';
import ServiceInitializer from 'ember-intl/service/initializer';

var get = Ember.get;

export default {
	name: 'ember-intl',

	initialize: function (container, app) {
		Ember.keys(requirejs._eak_seen).filter(function (key) {
			return key.indexOf(env.modulePrefix + '\/locales\/') === 0;
		}).forEach(function (moduleName) {
			var locale = require(moduleName, null, null, true)['default'];

			IntlMessageFormat.__addLocaleData(locale);
			IntlRelativeFormat.__addLocaleData(locale);
		});

		var initializer = new ServiceInitializer(container, app, {
			locales:        get(env, 'intl.locales')        || app.locales,
			defaultLocales: get(env, 'intl.defaultLocales') || app.defaultLocales
		});

		initializer.init();
	}
}
