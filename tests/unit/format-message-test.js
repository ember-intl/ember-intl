import Ember from 'ember';
import moduleForIntl from '../helpers/intl-block';
import { runAppend, runDestroy } from '../helpers/run-append';
import FormatMessage from 'ember-intl/formatters/format-message';
import formatMessageHelper from '../../helpers/format-message';

var view;

moduleForIntl('format-message', {
	setup: function (container) {
		container.register('ember-intl@formatter:format-message', FormatMessage);
		container.register('helper:format-message', formatMessageHelper, { instantiate: false });
	},
	teardown: function () {
		runDestroy(view);
	}
});

test('exists', function() {
	expect(1);

	ok(formatMessageHelper);
});

test('message is formatted correctly with argument', function() {
	expect(1);

	view = this.intlBlock('{{format-message "Hello {name}" name="Jason"}}');
	runAppend(view);

	equal(view.$().text(), "Hello Jason");
});

test('should throw if called with out a value', function(assert) {
	expect(1);
	view = this.intlBlock('{{format-message}}');
	assert.throws(runAppend(view), Error, 'raised error when not value is passed to format-message');
});
