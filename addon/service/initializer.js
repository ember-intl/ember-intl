import Ember from 'ember';
import IntlService from './intl';

var makeArray = Ember.makeArray;
var get       = Ember.get;

export function fetch (url) {
	return new Ember.RSVP.Promise(function (resolve, reject) {
		Ember.$.getScript(url)
			.done(function (result) { Ember.run(null, function () { resolve(result); }); })
			.fail(function (err)    { Ember.run(null, function () { reject(err); }); });
	});
}

function ServiceInitializer (container, app, options) {
	options = options || {};

	this.app             = app;
	this.container       = container;

	this.shimUrl         = options.shimUrl;
	this.disableShim     = options.disableShim;
	this.shimLocaleData  = options.shimLocaleData;

	this.locales         = options.locales;
	this.fallbackLocales = options.fallbackLocales;
}

ServiceInitializer.prototype = {
	constructor: ServiceInitializer,

	init: function () {
		return new Ember.RSVP.Promise(function (resolve, reject) {
			var app = this.app;

			app.deferReadiness();

			this.optionallyLoadShim().then(function (shimmed) {
				var service = this.createService(shimmed);

				// signals the locale data modules to execute
				Ember.instrument('intl.loaded', Ember, function () {
					// intentionally left blank
				});
			}.bind(this)).finally(function () {
				app.advanceReadiness();
				resolve();
			});
		}.bind(this));
	},

	optionallyLoadShim: function () {
		return new Ember.RSVP.Promise(function (resolve, reject) {
			if (window && !window.Intl && !this.disableShim) {
				fetch(this.shimUrl).then(function () {
					resolve(true);
				}, reject);
			} else {
				resolve();
			}
		}.bind(this));
	},

	createService: function (shimmed) {
		var app             = this.app;
		var ServiceKlass    = app.IntlService || IntlService;
		var service         = ServiceKlass.create({ container: this.container });

		var locales         = makeArray(this.locales);
		var fallbackLocales = makeArray(this.fallbackLocales);

		if (shimmed) {
			app.deferReadiness();

			var dir = this.shimLocaleData;
			if (dir[dir.length - 1] !== '/') {
				dir += '/';
			}

			Ember.RSVP.all(locales.concat(fallbackLocales).map(function (locale) {
				return fetch(dir + locale + '.js');
			})).finally(function () {
				app.advanceReadiness();
			});
		}

		Ember.assert('Locales has not been configured.  You must define a locale on your app.', locales || fallbackLocales);

		service.setProperties({
			locales:         locales,
			fallbackLocales: fallbackLocales,

			shimmed: Ember.computed(function () {
				return !!shimmed;
			}).readOnly()
		});

		app.register('intl:main', service, {
			singleton:   true,
			instantiate: false
		});

		app.inject('controller', 'intl', 'intl:main');
		app.inject('route',      'intl', 'intl:main');
		app.inject('model',      'intl', 'intl:main');
		app.inject('view',       'intl', 'intl:main');

		return service;
	}
};

export default ServiceInitializer;
