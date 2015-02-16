import Ember from 'ember';
import moduleForIntl from '../helpers/module-for-intl';
import { runAppend, runDestroy } from '../helpers/run-append';
import FormatDate from '../../formatters/format-date';
import formatDateHelper from '../../helpers/format-date';

var view;
var dateStr   = 'Thu Jan 23 2014 18:00:44 GMT-0500 (EST)';
var timeStamp = 1390518044403;

moduleForIntl('format-date', {
    setup: function (container) {
        container.register('formatter:format-date', FormatDate);
        Ember.HTMLBars._registerHelper('format-date', formatDateHelper);
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

test('it should return a formatted string from a date string', function() {
    expect(1);

    // Must provide `timeZone` because: https://github.com/yahoo/ember-intl/issues/21
    view = this.intlBlock('{{format-date "' + dateStr + '" timeZone="UTC"}}', {locales: 'en-US'});
    runAppend(view);
    equal(view.$().text(), '1/23/2014');
});

test('it should return a formatted string from a timestamp', function() {
    expect(1);

    // Must provide `timeZone` because: https://github.com/yahoo/ember-intl/issues/21
    view = this.intlBlock('{{format-date ' + timeStamp + ' timeZone="UTC"}}', {locales: 'en-US'});
    runAppend(view);
    equal(view.$().text(), '1/23/2014');
});

test('it should return a formatted string of just the time', function() {
    expect(1);

    view = this.intlBlock('{{format-date ' + timeStamp + ' hour="numeric" minute="numeric" timeZone="UTC"}}', {locales: 'en-US'});
    runAppend(view);
    equal(view.$().text(), '11:00 PM');
});

test('it should format the epoch timestamp', function() {
    expect(1);

    view = this.intlBlock('{{format-date 0}}', {locales: 'en-US'});
    runAppend(view);
    equal(view.$().text(), new Intl.DateTimeFormat('en').format(0));
});
