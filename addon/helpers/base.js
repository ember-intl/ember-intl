import Ember from 'ember';

var get = Ember.get;

function filterFormatOptions (formatOptions) {
	var match = false;
	var self  = this;

	var options = formatOptions.reduce(function (opts, name) {
		if (self.hasOwnProperty(name)) {
			match = true;
			opts[name] = self[name];
		}

		return opts;
	}, {});

	if (match) {
		return options;
	}
}

export default function (formatOptions, callback) {
	return Ember.HTMLBars.makeBoundHelper(function (params, hash, options, env) {
		Ember.assert('A value passed as an unnamed argument is required for all Intl helpers.', params.length === 1);

		var scope  = this;
		var intl   = this.container.lookup('intl:main');
		var value  = params[0];

		intl.one('localesChanged', this, function () {
			Ember.run.scheduleOnce('render', this, this.rerender);
		});

		var helperOptions = Ember.create({
			formats: hash.format  || filterFormatOptions.call(hash, formatOptions),
			locales: hash.locales || get(intl, 'locales')
		});

		return callback.call(scope, intl, value, helperOptions, hash);
	});
}