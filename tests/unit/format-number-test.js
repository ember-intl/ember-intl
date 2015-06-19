/**
 * Copyright 2015, Yahoo! Inc.
 * Copyrights licensed under the New BSD License. See the accompanying LICENSE file for terms.
 */

import Ember from 'ember';
import { moduleFor, test } from 'ember-qunit';
import formatNumberHelper from 'ember-intl/helpers/format-number';
import registerHelper from 'ember-intl/utils/register-helper';

import { runAppend, runDestroy } from '../helpers/run-append';
import createIntlBlock from '../helpers/create-intl-block';

var view;

moduleFor('ember-intl@formatter:format-number', {
    needs: ['service:intl'],
    beforeEach: function () {
        registerHelper('format-number', formatNumberHelper, this.container);

        this.container.register('formats:main', {
            number: {
                digits: {
                    minimumFractionDigits: 2
                },
                currency: {
                    style: 'currency',
                    minimumFractionDigits: 2
                }
            }
        }, { instantiate: false });
        this.container.injection('formatter', 'intl', 'service:intl');
        this.intlBlock = createIntlBlock(this.container);
    },
    afterEach: function () {
        runDestroy(view);
        this.container.unregister('formats:main');
    }
});

test('exists', function(assert) {
    assert.expect(1);
    assert.ok(formatNumberHelper);
});

test('invoke the formatNumber method', function(assert) {
    assert.expect(1);
    var service = this.container.lookup('service:intl');
    assert.equal(service.formatNumber(100), 100);
});

test('number is formatted correctly with default locale', function(assert) {
    assert.expect(1);
    var view = this.intlBlock('{{format-number 1000}}', { locale: 'en' });
    runAppend(view);
    assert.equal(view.$().text(), "1,000");
});

test('number is formatted correctly with locale argument', function(assert) {
    assert.expect(1);
    view = this.intlBlock('{{format-number 1000}}', { locale: 'fr-FR' });
    runAppend(view);
    // non-breaking space so we can't just compare "1 000" to "1 000"
    // since it's not a %20 space character
    assert.equal(escape(view.$().text()), "1%A0000");
});

test('should throw if called with out a value', function(assert) {
    assert.expect(1);
    view = this.intlBlock('{{format-number}}');
    assert.throws(runAppend(view), Error, 'raised error when not value is passed to format-number');
});

test('should return a string', function(assert) {
    assert.expect(1);
    view = this.intlBlock('{{format-number 4}}', { locale: 'en-US' });
    runAppend(view);
    assert.equal(view.$().text(), '4');
});

test('should return a decimal as a string', function(assert) {
    assert.expect(1);
    view = this.intlBlock('{{format-number NUM}}', { locale: 'en-US' });
    view.set('context', { NUM: 4.004 });
    runAppend(view);
    assert.equal(view.$().text(), '4.004');
});


test('should return a formatted string with a thousand separator', function(assert) {
    assert.expect(1);
    view = this.intlBlock('{{format-number NUM}}', { locale: 'en-US' });
    view.set('context', { NUM: 40000 });
    runAppend(view);
    assert.equal(view.$().text(), '40,000');
});


test('should return a formatted string with a thousand separator and decimal', function(assert) {
    assert.expect(1);
    view = this.intlBlock('{{format-number NUM}}', { locale: 'en-US' });
    view.set('context', { NUM: 40000.004 });
    runAppend(view);
    assert.equal(view.$().text(), '40,000.004');
});

test('locale can be passed as an argument', function(assert) {
    assert.expect(1);
    view = this.intlBlock('{{format-number NUM locale="de-DE"}}');
    view.set('context', { NUM: 4.004 });
    runAppend(view);
    assert.equal(view.$().text(), '4,004');
});

test('in another locale - should return a string', function(assert) {
    assert.expect(1);
    view = this.intlBlock('{{format-number 4}}', { locale: 'de-DE' });
    runAppend(view);
    assert.equal(view.$().text(), '4');
});

test('in another locale - should return a decimal as a string', function(assert) {
    assert.expect(1);
    view = this.intlBlock('{{format-number NUM}}', { locale: 'de-DE' });
    view.set('context', { NUM: 4.004 });
    runAppend(view);
    assert.equal(view.$().text(), '4,004');
});


test('in another locale - should return a formatted string with a thousand separator', function(assert) {
    assert.expect(1);
    view = this.intlBlock('{{format-number NUM}}', { locale: 'de-DE' });
    view.set('context', { NUM: 40000 });
    runAppend(view);
    assert.equal(view.$().text(), '40.000');
});

test('in another locale - should return a formatted string with a thousand separator and decimal', function(assert) {
    assert.expect(1);
    view = this.intlBlock('{{format-number NUM}}', { locale: 'de-DE' });
    view.set('context', { NUM: 40000.004 });
    runAppend(view);
    assert.equal(view.$().text(), '40.000,004');
});

test('currency - should return a string formatted to currency', function(assert) {
    assert.expect(3);
    view = this.intlBlock('{{format-number 40000 format="currency" style="currency" currency="USD"}}', { locale: 'en-US' });
    runAppend(view);
    assert.equal(view.$().text(), '$40,000.00');
    view = this.intlBlock('{{format-number 40000 format="currency" style="currency" currency="EUR"}}', { locale: 'en-US' });
    runAppend(view);
    assert.equal(view.$().text(), '€40,000.00');
    view = this.intlBlock('{{format-number 40000 style="currency" currency="JPY"}}', { locale: 'en-US' });
    runAppend(view);
    assert.equal(view.$().text(), '¥40,000');
});

test('should function within an `each` block helper', function(assert) {
    assert.expect(1);
    view = this.intlBlock('{{#each currency in currencies}} {{format-number currency.AMOUNT format="currency" style="currency" currency=currency.CURRENCY}}{{/each}}', { locale: 'en-US' });

    view.set('context', {
        currencies: [
            { AMOUNT: 3, CURRENCY: 'USD'},
            { AMOUNT: 8, CURRENCY: 'EUR'},
            { AMOUNT: 10, CURRENCY: 'JPY'}
        ]
    });

    runAppend(view);
    assert.equal(view.$().text(), ' $3.00 €8.00 ¥10.00');
});

test('should be able to combine hash options with format options', function(assert) {
    assert.expect(1);
    view = this.intlBlock('{{format-number 1 format="digits" minimumIntegerDigits=10}}', { locale: 'en-US' });
    runAppend(view);
    assert.equal(view.$().text(), '0,000,000,001.00', 'should return a string formatted to a percent');
});

test('used to format percentages', function(assert) {
    assert.expect(2);
    view = this.intlBlock('{{format-number 400 style="percent"}}', { locale: 'en-US' });
    runAppend(view);
    assert.equal(view.$().text(), '40,000%', 'should return a string formatted to a percent');
    view = this.intlBlock('{{format-number 400 style="percent"}}', { locale: 'de-DE' });
    runAppend(view);
    assert.equal(escape(view.$().text()), '40.000%A0%25', 'de should return a string formatted to a percent');
});
