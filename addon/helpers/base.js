import Ember from 'ember';

var get = Ember.get;

function filterFormatOptions (obj, formatOptions) {
	var match = false;

	var options = formatOptions.reduce(function (opts, name) {
		if (obj.hasOwnProperty(name)) {
			match = true;
			opts[name] = obj[name];
		}

		return opts;
	}, {});

	if (match) {
		return options;
	}
}

export default function (formatOptions, callback, escapeHtml) {
	// escapes HTML by forcing morph.updateText instead of morph.updateHtml
	if (arguments.length < 3) { escapeHtml = true; }

	return Ember.HTMLBars.makeBoundHelper(function (params, hash, options, env) {
		Ember.assert('A value passed as an unnamed argument is required for all Intl helpers.', params.length === 1);

		var scope  = this;
		var intl   = this.container.lookup('intl:main');

		var helperOptions = Ember.create({
			formats: hash.format  || filterFormatOptions(hash, formatOptions),
			locales: hash.locales || get(intl, 'locales')
		});

		function render () {
			return callback.call(scope, intl, params[0], helperOptions, hash);
		}

		Ember.addObserver(intl, 'locales', function () {
			Ember.run.scheduleOnce('render', function () {
				// TODO (bug):causes double render the first time
				options.morph[escapeHtml ? 'updateText' : 'updateHtml'](render());
			});
		});

		return render();
	});
}