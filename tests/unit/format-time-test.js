import Ember from 'ember';
import IntlService from '../../service/intl';
import { runAppend, runDestroy } from '../helpers/run-append';
import formatTimeHelper from '../../helpers/format-time';
import setupIntlBlock from '../helpers/intl-block';

var intlBlock, container, view, service, lookup;
var dateStr   = 'Thu Jan 23 2014 18:00:44 GMT-0500 (EST)';
var timeStamp = 1390518044403;

QUnit.module('format-time', setupIntlBlock());

test('FormatTime exists', function() {
	expect(1);

	ok(formatTimeHelper);
});

test('it should return a formatted string', function() {
	expect(1);

	view = this.intlBlock('{{format-time "' + dateStr + '"}}', {locales: 'en-US'});
	runAppend(view);
	equal(view.$().text(), '1/23/2014');
});

test('it should return a formatted string', function() {
	expect(1);

	view = this.intlBlock('{{format-time ' + timeStamp + '}}', {locales: 'en-US'});
	runAppend(view);
	equal(view.$().text(), '1/23/2014');
});

test('it should return a formatted string of just the time', function() {
	expect(1);

	view = this.intlBlock('{{format-time ' + timeStamp + ' hour="numeric" minute="numeric" timeZone="UTC"}}', {locales: 'en-US'});
	runAppend(view);
	equal(view.$().text(), '11:00 PM');
});

test('it should format the epoch timestamp', function() {
	expect(1);

	view = this.intlBlock('{{format-time 0}}', {locales: 'en-US'});
	runAppend(view);
	equal(view.$().text(), new Intl.DateTimeFormat('en').format(0));
});
