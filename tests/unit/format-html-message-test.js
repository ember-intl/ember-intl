import Ember from 'ember';
import moduleForIntl from '../helpers/intl-block';
import { runAppend, runDestroy } from '../helpers/run-append';
import FormatHtmlMessage from 'ember-intl/formatters/format-html-message';
import formatHtmlHelper from '../../helpers/format-html-message';

var view;

moduleForIntl('format-html-message', {
	setup: function (container) {
		container.register('ember-intl@formatter:format-html-message', FormatHtmlMessage);
		container.register('helper:format-html-message', formatHtmlHelper, { instantiate: false });
	},
	teardown: function () {
		runDestroy(view);
	}
});

test('exists', function() {
	expect(1);

	ok(formatHtmlHelper);
});

test('message is formatted correctly with argument', function() {
	expect(1);

	view = this.intlBlock('{{format-html-message "Hello {name}" name="Jason"}}');
	runAppend(view);

	equal(view.$().text(), "Hello Jason");
});

test('should throw if called with out a value', function(assert) {
	expect(1);
	view = this.intlBlock('{{format-html-message}}');
	assert.throws(runAppend(view), Error, 'raised error when not value is passed to format-html-message');
});
