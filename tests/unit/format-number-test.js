import Ember from 'ember';
import moduleForIntl from '../helpers/intl-block';
import { runAppend, runDestroy } from '../helpers/run-append';
import FormatNumber from 'ember-intl/formatters/format-number';
import formatNumberHelper from '../../helpers/format-number';

var view;

moduleForIntl('format-number', {
	setup: function (container) {
		container.register('ember-intl@formatter:format-number', FormatNumber);
		container.register('helper:format-number', formatNumberHelper, { instantiate: false });
	},
	teardown: function () {
		runDestroy(view);
	}
});

test('exists', function() {
	expect(1);
	ok(formatNumberHelper);
});

test('number is formatted correctly with default locale', function() {
	expect(1);

	var view = this.intlBlock('{{format-number 1000}}');

	runAppend(view);

	// non-breaking space so we can't just compare "1 000" to "1 000"
	// since it's not a %20 space character
	equal(view.$().text(), "1,000");
});

test('number is formatted correctly with locale argument', function() {
	expect(1);

	view = this.intlBlock('{{format-number 1000}}', { locales: 'fr-FR' });

	runAppend(view);

	// non-breaking space so we can't just compare "1 000" to "1 000"
	// since it's not a %20 space character
	equal(escape(view.$().text()), "1%A0000");
});

test('should throw if called with out a value', function(assert) {
	expect(1);
	view = this.intlBlock('{{format-number}}');
	assert.throws(runAppend(view), Error, 'raised error when not value is passed to format-number');
});
