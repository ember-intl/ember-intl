import Ember from 'ember';

var Stream = Ember.__loader.require('ember-metal/streams/stream')['default'];

var formatOptions = [
	'localeMatcher', 'style', 'currency', 'currencyDisplay',
	'useGrouping', 'minimumIntegerDigits', 'minimumFractionDigits',
	'maximumFractionDigits', 'minimumSignificantDigits',
	'maximumSignificantDigits'
];

function filterFormatOptions (obj) {
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

export default function (value, options) {
	var intl         = this.container.lookup('intl:main');
	var args         = Array.prototype.slice.call(arguments);
	var options      = args[args.length - 1] || {};
	var hash         = options.hash;
	var inputStream  = this.getStream(value);
	var localeStream = this.getStream('intl.locales');

	var stream = new Stream(function () {
		return intl.formatNumber(inputStream.value(), {
			formats: filterFormatOptions(hash),
			locales: hash.locales || intl.get('locales')
		})
	});

	Ember.addObserver(intl, 'locales', function() {
		stream.notify();
	});

	localeStream.subscribe(stream.notify, stream);
	inputStream.subscribe(stream.notify, stream);

	return stream;
};
