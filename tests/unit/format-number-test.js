import Ember from 'ember';
import IntlService from '../../service/intl';
import { runAppend, runDestroy } from '../helpers/run-append';
import formatNumberHelper from '../../helpers/format-number';
import setupIntlBlock from '../helpers/intl-block';

var intlBlock, container, view, service, lookup;

QUnit.module('format-number', setupIntlBlock());

test('FormatNumber exists', function() {
	expect(1);

	ok(formatNumberHelper);
});

test('Number is formatted correctly with default locale', function() {
	expect(1);

	var view = this.intlBlock('{{format-number 1000}}');

	runAppend(view);

	// non-breaking space so we can't just compare "1 000" to "1 000"
	// since it's not a %20 space character
	equal(view.$().text(), "1,000");
});

test('Number is formatted correctly with locale argument', function() {
	expect(1);

	var view = this.intlBlock('{{format-number 1000 locales="fr-FR"}}');

	runAppend(view);
	// non-breaking space so we can't just compare "1 000" to "1 000"
	// since it's not a %20 space character
	equal(escape(view.$().text()), "1%A0000");
});
