import Ember from 'ember';
import {module, test} from 'qunit';
import moduleForIntl from '../helpers/module-for-intl';
import { runAppend, runDestroy } from '../helpers/run-append';
import FormatHtmlMessage from '../../formatters/format-html-message';
import formatHtmlHelper from 'ember-intl/helpers/format-html-message';

var view;

moduleForIntl('format-html-message', {
    setup: function (container) {
        container.register('formatter:format-html-message', FormatHtmlMessage);
        Ember.HTMLBars._registerHelper('format-html-message', formatHtmlHelper);
    },
    teardown: function () {
        runDestroy(view);
    }
});

test('exists', function(assert) {
    assert.expect(1);
    assert.ok(formatHtmlHelper);
});

test('message is formatted correctly with argument', function(assert) {
    assert.expect(1);

    view = this.intlBlock('{{format-html-message "Hello {name}" name="Jason"}}');
    runAppend(view);

    assert.equal(view.$().text(), "Hello Jason");
});

test('should throw if called with out a value', function(assert) {
    assert.expect(1);
    view = this.intlBlock('{{format-html-message}}');
    assert.throws(runAppend(view), Error, 'raised error when not value is passed to format-html-message');
});

test('should allow for inlined html in the value', function(assert) {
    assert.expect(1);

    view = this.intlBlock('{{format-html-message "<strong>Hello {name}</strong>" name="Jason"}}');
    runAppend(view);

    assert.equal(view.$().html(), "<strong>Hello Jason</strong>");
});

test('should escape arguments', function(assert) {
    assert.expect(1);

    view = this.intlBlock('{{format-html-message "{foo}" foo="<em>BAR</em>"}}');
    runAppend(view);

    assert.equal(view.$().html(), "&lt;em&gt;BAR&lt;/em&gt;");
});

test('should allow for inlined html in the value but escape arguments', function(assert) {
    assert.expect(1);

    view = this.intlBlock('{{format-html-message "<strong>Hello {name}</strong>" name="<em>Jason</em>"}}');
    runAppend(view);

    assert.equal(view.$().html(), "<strong>Hello &lt;em&gt;Jason&lt;/em&gt;</strong>");
});
