import Ember from 'ember';
import env from '../config/environment';
import registerHelpers from '../register-helpers';
import ServiceInitializer from 'ember-intl/service/initializer';

var get = Ember.get;

export default {
	name: 'ember-intl',

	initialize: function (container, app) {
		if (!env.intl.disableShim) {
			Ember.assert('Intl.js shim URL must be present', env.intl.shimUrl);
		}

		var initializer = new ServiceInitializer(container, app, {
			currentLocales: get(env, 'intl.currentLocales') || app.currentLocales,
			defaultLocales: get(env, 'intl.defaultLocales') || app.defaultLocales,
			shimLocaleData: get(env, 'intl.shimLocaleData'),
			shimUrl:        get(env, 'intl.shimUrl'),
			disableShim:    get(env, 'intl.disableShim')
		});

		initializer.init().then(function () {
			registerHelpers(Ember.Handlebars);
		});
	}
}
