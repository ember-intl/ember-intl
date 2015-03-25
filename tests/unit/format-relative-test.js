import Ember from 'ember';
import moduleForIntl from '../helpers/module-for-intl';
import { runAppend, runDestroy } from '../helpers/run-append';
import FormatRelative from '../../formatters/format-relative';
import formatRelativehelper from 'ember-intl/helpers/format-relative';

var view;

moduleForIntl('format-relative', {
    setup: function (container) {
        container.register('formatter:format-relative', FormatRelative);

        container.optionsForType('formats', {
            singleton:   true,
            instantiate: false
        });

        container.register('formats:main', {
            relative: {
                hours: {
                    units: "hour",
                    style: "numeric"
                }
            }
        });
        Ember.HTMLBars._registerHelper('format-relative', formatRelativehelper);
    },
    teardown: function () {
        runDestroy(view);
    }
});

test('exists', function() {
    expect(1);
    ok(formatRelativehelper);
});

test('invoke the formatRelative directly', function() {
    expect(1);
    equal(this.service.formatRelative(new Date()), 'now');
});

test('should throw if called with out a value', function(assert) {
    expect(1);
    view = this.intlBlock('{{format-relative}}');
    assert.throws(runAppend(view), Error, 'raised error when not value is passed to format-relative');
});

test('can specify a `value` and `now` on the options hash', function(assert) {
    expect(1);
    view = this.intlBlock('{{format-relative 2000 now=0}}');
    runAppend(view);
    equal(view.$().text(), 'in 2 seconds');
});

test('should return relative time in hours, not best fit', function(assert) {
    expect(1);

    var twoDays = (1000 * 60 * 60 * 24) * 2;

    view = this.intlBlock('{{format-relative ' + twoDays + ' now=0 format="hours"}}');
    runAppend(view);

    equal(view.$().text(), 'in 48 hours');
});


test('should return now', function(assert) {
    expect(1);
    view = this.intlBlock('{{format-relative ' + new Date().getTime() + '}}');
    runAppend(view);
    equal(view.$().text(), 'now');
});
