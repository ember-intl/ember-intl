import Ember from 'ember';
import config from './config/environment';

export default function (prefix) {
	var seen = Ember.keys(requirejs._eak_seen);

	seen.filter(function (key) {
		return key.test('^' + config.modulePrefix + '/locales/').length > 0;
	}).forEach(function (moduleName) {
		try {
			var module = require(moduleName, null, null, true);
			//
			// register this into the service?
			//
		} catch (err) {
			/**
			NOTE: Silently fail on helpers that could not be registered.
			This is because we have some helpers in the helper folder
			that are not actual helpers.  There is a github issue opened to
			move these to utils, and then we can remove this in favor of

			Ember.Logger.error(err);
			*/
		}
	});
}
