'use strict';

var defaults = require('lodash-node/modern/objects/defaults');

var defaultConfig = {
	disableShim:    false,
	shimUrl:        '/assets/intl/Intl.js',
	shimLocaleData: '/assets/intl/base-locales/',
	intl: {
		en: {
			dest:    '/assets/intl/locales',
			locales: ['en-US']
		}
	}
}

module.exports = function(env, appConfig) {
	appConfig = appConfig || {};

	appConfig.intl = defaults(defaultConfig, appConfig.intl);
	appConfig.APP.locales = ['en-US'];
	appConfig.APP.fallbackLocales = ['en-US'];

	return appConfig;
};
