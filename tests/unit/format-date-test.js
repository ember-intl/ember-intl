import Ember from 'ember';
import moduleForIntl from '../helpers/intl-block';
import { runAppend, runDestroy } from '../helpers/run-append';
import FormatDate from 'ember-intl/formatters/format-date';
import formatDateHelper from '../../helpers/format-date';

var view;

moduleForIntl('format-date', {
	setup: function (container) {
		container.register('ember-intl@formatter:format-date', FormatDate);
		container.register('helper:format-date', formatDateHelper, { instantiate: false });
	},
	teardown: function () {
		runDestroy(view);
	}
});

test('exists', function() {
	expect(1);
	ok(formatDateHelper);
});

test('should throw if called with out a value', function(assert) {
	expect(1);
	view = this.intlBlock('{{format-date}}');
	assert.throws(runAppend(view), Error, 'raised error when not value is passed to format-date');
});
