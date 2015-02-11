import Ember from 'ember';
import moduleForIntl from '../helpers/module-for-intl';
import { runAppend, runDestroy } from '../helpers/run-append';
import FormatNumber from '../../formatters/format-number';
import formatNumberHelper from '../../helpers/format-number';

var view, container;

moduleForIntl('format-number', {
    setup: function (_container) {
        container = _container;
        
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
        container.register('helper:format-number', formatNumberHelper, { instantiate: false });
    },
    teardown: function () {
        runDestroy(view);
        container.unregister('formats:main');
    }
});

test('exists', function() {
    expect(1);
    ok(formatNumberHelper);
});

test('number is formatted correctly with default locale', function() {
    expect(1);

    var view = this.intlBlock('{{format-number 1000}}');
    runAppend(view);
    equal(view.$().text(), "1,000");
});

test('number is formatted correctly with locale argument', function() {
    expect(1);

    view = this.intlBlock('{{format-number 1000}}', { locales: 'fr-FR' });
    runAppend(view);

    // non-breaking space so we can't just compare "1 000" to "1 000"
    // since it's not a %20 space character
    equal(escape(view.$().text()), "1%A0000");
});

test('should throw if called with out a value', function(assert) {
    expect(1);
    view = this.intlBlock('{{format-number}}');
    assert.throws(runAppend(view), Error, 'raised error when not value is passed to format-number');
});

test('should return a string', function() {
    expect(1);

    view = this.intlBlock('{{format-number 4}}', { locales: 'en-US' });
    runAppend(view);

    equal(view.$().html(), '4');
});

test('should return a decimal as a string', function() {
    expect(1);

    view = this.intlBlock('{{format-number NUM}}', { locales: 'en-US' });

    view.set('context', {
        NUM: 4.004
    });

    runAppend(view);

    equal(view.$().html(), '4.004');
});


test('should return a formatted string with a thousand separator', function() {
    expect(1);

    view = this.intlBlock('{{format-number NUM}}', { locales: 'en-US' });

    view.set('context', {
        NUM: 40000
    });

    runAppend(view);

    equal(view.$().html(), '40,000');
});


test('should return a formatted string with a thousand separator and decimal', function() {
    expect(1);

    view = this.intlBlock('{{format-number NUM}}', { locales: 'en-US' });

    view.set('context', {
        NUM: 40000.004
    });

    runAppend(view);

    equal(view.$().html(), '40,000.004');
});

test('in another locale - should return a string', function() {
    expect(1);

    view = this.intlBlock('{{format-number 4}}', { locales: 'de-DE' });

    runAppend(view);

    equal(view.$().html(), '4');
});

test('in another locale - should return a decimal as a string', function() {
    expect(1);

    view = this.intlBlock('{{format-number NUM}}', { locales: 'de-DE' });

    view.set('context', {
        NUM: 4.004
    });

    runAppend(view);

    equal(view.$().html(), '4,004');
});


test('in another locale - should return a formatted string with a thousand separator', function() {
    expect(1);

    view = this.intlBlock('{{format-number NUM}}', { locales: 'de-DE' });

    view.set('context', {
        NUM: 40000
    });

    runAppend(view);

    equal(view.$().html(), '40.000');
});

test('in another locale - should return a formatted string with a thousand separator and decimal', function() {
    expect(1);

    view = this.intlBlock('{{format-number NUM}}', { locales: 'de-DE' });

    view.set('context', {
        NUM: 40000.004
    });

    runAppend(view);

    equal(view.$().html(), '40.000,004');
});

test('currency - should return a string formatted to currency', function() {
    expect(3);

    view = this.intlBlock('{{format-number 40000 format="currency" style="currency" currency="USD"}}', { locales: 'en-US' });

    runAppend(view);

    equal(view.$().text(), '$40,000.00');

    view = this.intlBlock('{{format-number 40000 format="currency" style="currency" currency="EUR"}}', { locales: 'en-US' });

    runAppend(view);

    equal(view.$().text(), '€40,000.00');

    view = this.intlBlock('{{format-number 40000 style="currency" currency="JPY"}}', { locales: 'en-US' });

    runAppend(view);

    equal(view.$().text(), '¥40,000');
});

test('should function within an `each` block helper', function() {
    expect(1);

    view = this.intlBlock('{{#each currency in currencies}} {{format-number currency.AMOUNT format="currency" style="currency" currency=currency.CURRENCY}}{{/each}}', { locales: 'en-US' });

    view.set('context', {
        currencies: [
            { AMOUNT: 3, CURRENCY: 'USD'},
            { AMOUNT: 8, CURRENCY: 'EUR'},
            { AMOUNT: 10, CURRENCY: 'JPY'}
        ]
    });

    runAppend(view);

    equal(view.$().text(), ' $3.00 €8.00 ¥10.00');
});

test('should be able to combine hash options with format options', function() {
    expect(1);

    view = this.intlBlock('{{format-number 1 format="digits" minimumIntegerDigits=10}}', { locales: 'en-US' });

    runAppend(view);

    equal(view.$().text(), '0,000,000,001.00', 'should return a string formatted to a percent');
});

test('used to format percentages', function() {
    expect(2);

    view = this.intlBlock('{{format-number 400 style="percent"}}', { locales: 'en-US' });

    runAppend(view);

    equal(view.$().text(), '40,000%', 'should return a string formatted to a percent');

    view = this.intlBlock('{{format-number 400 style="percent"}}', { locales: 'de-DE' });

    runAppend(view);

    equal(escape(view.$().text()), '40.000%A0%25', 'de should return a string formatted to a percent');
});
