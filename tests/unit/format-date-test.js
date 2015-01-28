import Ember from 'ember';
import IntlService from '../../service/intl';
import { runAppend, runDestroy } from '../helpers/run-append';
import formatDateHelper from '../../helpers/format-date';
import setupIntlBlock from '../helpers/intl-block';

var intlBlock, container, view, service, lookup;
var dateStr   = 'Thu Jan 23 2014 18:00:44 GMT-0500 (EST)';
var timeStamp = 1390518044403;

QUnit.module('format-date', setupIntlBlock());

test('FormatDate exists', function() {
	expect(1);

	ok(formatDateHelper);
});

test('it should return a formatted string from a date string', function() {
	expect(1);

	view = this.intlBlock('{{format-date "' + dateStr + '"}}', {locales: 'en-US'});
	runAppend(view);
	equal(view.$().text(), '1/23/2014');
});

test('it should return a formatted string from a timestamp', function() {
	expect(1);

	view = this.intlBlock('{{format-date ' + timeStamp + '}}', {locales: 'en-US'});
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
