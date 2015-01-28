import Ember from 'ember';
import moduleForIntl from '../helpers/module-for-intl';
import { runAppend, runDestroy } from '../helpers/run-append';
import FormatRelative from 'ember-intl/formatters/format-relative';
import formatRelativehelper from '../../helpers/format-relative';

var view;

moduleForIntl('format-relative', {
    setup: function (container) {
        container.register('ember-intl@formatter:format-relative', FormatRelative);
        container.register('helper:format-relative', formatRelativehelper, { instantiate: false });
    },
    teardown: function () {
        runDestroy(view);
    }
});

test('exists', function() {
    expect(1);
    ok(formatRelativehelper);
});

test('should throw if called with out a value', function(assert) {
    expect(1);
    view = this.intlBlock('{{format-relative}}');
    assert.throws(runAppend(view), Error, 'raised error when not value is passed to format-relative');
});
