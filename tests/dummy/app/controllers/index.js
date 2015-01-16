import Ember from 'ember';

var now       = new Date();
var yesterday = now.setDate(now.getDate() - 1);
var alias     = Ember.computed.alias;
var numeric   = 'numeric';
var currency  = 'currency';

function formatNumber (number, options) {
	return Ember.computed('intl.locale', function () {
		return this.intl.formatNumber(number, options);
	});
}

export default Ember.Controller.extend({
	options:     ['en-US', 'fr-FR'],
	numType:     'currency',
	num:         1000,
	yesterday:   yesterday,
	deadline:    Ember.computed.readOnly('yesterday'),
	now:         now,

	value: Ember.computed('intl.locales', function (key, value) {
		if (arguments.length === 2) {
			this.set('intl.locales', arguments[1]);
		}

		return this.get('intl.locales.firstObject') || this.get('intl.locales');
	}),

	messages: {
		photos: '{name} took {numPhotos, plural,\n  =0 {no photos}\n  =1 {one photo}\n  other {# photos}\n} on {takenDate, date, long}.\n'
	},

	formatNumberPercent: formatNumber(400, { style: 'percent' }),
	formatNumberSimple:  formatNumber(400),
	formatNumberEuro:    formatNumber(400, 'EUR'),

	formatMessageExample: Ember.computed('intl.locale', function () {
		return this.intl.formatMessage(this.messages.photos, {
			name:      'Jason',
			numPhotos: 1400,
			takenDate: now
		});
	}),

	incrementTime: Ember.on('init', function() {
		var self = this;

		setInterval(function() {
			Ember.run(function() {
				self.set('now', new Date());
				self.incrementProperty('num');
			});
		}, 10);
	})
});
