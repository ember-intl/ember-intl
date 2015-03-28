import Ember from 'ember';
import {module, test} from 'qunit';
import moduleForIntl from '../helpers/module-for-intl';
import { runAppend, runDestroy } from '../helpers/run-append';
import FormatNumber from '../../formatters/format-number';
import formatNumberHelper from 'ember-intl/helpers/format-number';

var view, container;

moduleForIntl('format-number', {
    beforeEach: function () {
        container = this.container;

        container.register('formats:main', {
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

        container.register('formatter:format-number', FormatNumber);
        Ember.HTMLBars._registerHelper('format-number', formatNumberHelper);
    },

    afterEach: function () {
        runDestroy(view);
        container.unregister('formats:main');
    }
});

test('exists', function(assert) {
    assert.expect(1);
    assert.ok(formatNumberHelper);
});

test('invoke the formatNumber method', function(assert) {
    assert.expect(1);

    assert.equal(this.service.formatNumber(100), 100);
});

test('number is formatted correctly with default locale', function(assert) {
    assert.expect(1);

    var view = this.intlBlock('{{format-number 1000}}');
    runAppend(view);
    assert.equal(view.$().text(), "1,000");
});

test('number is formatted correctly with locale argument', function(assert) {
    assert.expect(1);

    view = this.intlBlock('{{format-number 1000}}', { locales: 'fr-FR' });
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

    view = this.intlBlock('{{format-number 4}}', { locales: 'en-US' });
    runAppend(view);

    assert.equal(view.$().text(), '4');
});

test('should return a decimal as a string', function(assert) {
    assert.expect(1);

    view = this.intlBlock('{{format-number NUM}}', { locales: 'en-US' });

    view.set('context', {
        NUM: 4.004
    });

    runAppend(view);

    assert.equal(view.$().text(), '4.004');
});


test('should return a formatted string with a thousand separator', function(assert) {
    assert.expect(1);

    view = this.intlBlock('{{format-number NUM}}', { locales: 'en-US' });

    view.set('context', {
        NUM: 40000
    });

    runAppend(view);

    assert.equal(view.$().text(), '40,000');
});


test('should return a formatted string with a thousand separator and decimal', function(assert) {
    assert.expect(1);

    view = this.intlBlock('{{format-number NUM}}', { locales: 'en-US' });

    view.set('context', {
        NUM: 40000.004
    });

    runAppend(view);

    assert.equal(view.$().text(), '40,000.004');
});

test('locales can be passed as an argument', function(assert) {
    assert.expect(1);

    view = this.intlBlock('{{format-number NUM locales="de-DE"}}');

    view.set('context', {
        NUM: 4.004
    });

    runAppend(view);

    assert.equal(view.$().text(), '4,004');
});

test('in another locale - should return a string', function(assert) {
    assert.expect(1);

    view = this.intlBlock('{{format-number 4}}', { locales: 'de-DE' });

    runAppend(view);

    assert.equal(view.$().text(), '4');
});

test('in another locale - should return a decimal as a string', function(assert) {
    assert.expect(1);

    view = this.intlBlock('{{format-number NUM}}', { locales: 'de-DE' });

    view.set('context', {
        NUM: 4.004
    });

    runAppend(view);

    assert.equal(view.$().text(), '4,004');
});


test('in another locale - should return a formatted string with a thousand separator', function(assert) {
    assert.expect(1);

    view = this.intlBlock('{{format-number NUM}}', { locales: 'de-DE' });

    view.set('context', {
        NUM: 40000
    });

    runAppend(view);

    assert.equal(view.$().text(), '40.000');
});

test('in another locale - should return a formatted string with a thousand separator and decimal', function(assert) {
    assert.expect(1);

    view = this.intlBlock('{{format-number NUM}}', { locales: 'de-DE' });

    view.set('context', {
        NUM: 40000.004
    });

    runAppend(view);

    assert.equal(view.$().text(), '40.000,004');
});

test('currency - should return a string formatted to currency', function(assert) {
    assert.expect(3);

    view = this.intlBlock('{{format-number 40000 format="currency" style="currency" currency="USD"}}', { locales: 'en-US' });

    runAppend(view);

    assert.equal(view.$().text(), '$40,000.00');

    view = this.intlBlock('{{format-number 40000 format="currency" style="currency" currency="EUR"}}', { locales: 'en-US' });

    runAppend(view);

    assert.equal(view.$().text(), '€40,000.00');

    view = this.intlBlock('{{format-number 40000 style="currency" currency="JPY"}}', { locales: 'en-US' });

    runAppend(view);

    assert.equal(view.$().text(), '¥40,000');
});

test('should function within an `each` block helper', function(assert) {
    assert.expect(1);

    view = this.intlBlock('{{#each currency in currencies}} {{format-number currency.AMOUNT format="currency" style="currency" currency=currency.CURRENCY}}{{/each}}', { locales: 'en-US' });

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

    view = this.intlBlock('{{format-number 1 format="digits" minimumIntegerDigits=10}}', { locales: 'en-US' });

    runAppend(view);

    assert.equal(view.$().text(), '0,000,000,001.00', 'should return a string formatted to a percent');
});

test('used to format percentages', function(assert) {
    assert.expect(2);

    view = this.intlBlock('{{format-number 400 style="percent"}}', { locales: 'en-US' });

    runAppend(view);

    assert.equal(view.$().text(), '40,000%', 'should return a string formatted to a percent');

    view = this.intlBlock('{{format-number 400 style="percent"}}', { locales: 'de-DE' });

    runAppend(view);

    assert.equal(escape(view.$().text()), '40.000%A0%25', 'de should return a string formatted to a percent');
});
