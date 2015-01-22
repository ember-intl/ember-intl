import Ember from 'ember';
import env from '../config/environment';
import ServiceInitializer from 'ember-intl/service/initializer';

var get = Ember.get;

export default {
	name: 'ember-intl',

	initialize: function (container, app) {
		var initializer = new ServiceInitializer(container, app, {
			locales:        get(env, 'intl.locales')        || app.locales,
			defaultLocales: get(env, 'intl.defaultLocales') || app.defaultLocales
		});

		initializer.init();
	}
}
