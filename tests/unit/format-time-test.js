import Ember from 'ember';
import moduleForIntl from '../helpers/intl-block';
import { runAppend, runDestroy } from '../helpers/run-append';
import FormatTime from 'ember-intl/formatters/format-time';
import formatTimeHelper from '../../helpers/format-time';

var view;

moduleForIntl('format-time', {
	setup: function (container) {
		container.register('ember-intl@formatter:format-time', FormatTime);
		container.register('helper:format-time', formatTimeHelper, { instantiate: false });
	},
	teardown: function () {
		runDestroy(view);
	}
});

test('exists', function() {
	expect(1);
	ok(formatTimeHelper);
});

test('should throw if called with out a value', function(assert) {
	expect(1);
	view = this.intlBlock('{{format-time}}');
	assert.throws(runAppend(view), Error, 'raised error when not value is passed to format-time');
});
