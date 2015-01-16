import Ember from 'ember';
import env from '../config/environment';
import ServiceInitializer from 'ember-intl/service/initializer';

var get = Ember.get;

export default {
	name: 'ember-intl',

	initialize: function (container, app) {
		if (!env.intl.disableShim) {
			Ember.assert('Intl.js shim URL must be present', env.intl.shimUrl);
		}

		var initializer = new ServiceInitializer(container, app, {
			locales:         get(env, 'intl.locales')         || app.locales,
			fallbackLocales: get(env, 'intl.fallbackLocales') || app.fallbackLocales,
			shimLocaleData:  get(env, 'intl.shimLocaleData'),
			shimUrl:         get(env, 'intl.shimUrl'),
			disableShim:     get(env, 'intl.disableShim')
		});

		initializer.init();
	}
}
