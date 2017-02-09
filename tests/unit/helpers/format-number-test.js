import Ember from 'ember';
import hbs from 'htmlbars-inline-precompile';
import { moduleForComponent, test } from 'ember-qunit';
import formatNumberHelper from 'ember-intl/helpers/format-number';

let service, registry;

moduleForComponent('format-number', {
  integration: true,
  beforeEach() {
    registry = this.registry || this.container;
    service = this.container.lookup('service:intl');
    service.setLocale('en-us');

    registry.register('formats:main', {
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
  }
});

test('exists', function(assert) {
  assert.expect(1);
  assert.ok(formatNumberHelper);
});

test('invoke the formatNumber method', function(assert) {
  assert.expect(1);
  assert.equal(service.formatNumber(100), 100);
});

test('number is formatted correctly with default locale', function(assert) {
  assert.expect(1);
  this.render(hbs`{{format-number 1000}}`);
  assert.equal(this.$().text(), "1,000");
});

test('number is formatted correctly with locale argument', function(assert) {
  assert.expect(1);
  service.setLocale('fr-fr');
  this.render(hbs`{{format-number 1000}}`);
  // non-breaking space so we can't just compare "1 000" to "1 000"
  // since it's not a %20 space character
  assert.equal(escape(this.$().text()), "1%A0000");
});

test('should throw if called with out a value', function(assert) {
  assert.expect(1);

  try {
    this.render(hbs`{{format-number}}`);
  } catch(ex) {
    assert.ok(ex, 'raised error when not value is passed to format-number');
  }
});

test('should return a string', function(assert) {
  assert.expect(1);
  this.render(hbs`{{format-number 4}}`);
  assert.equal(this.$().text(), '4');
});

test('should handle undefined value when allowEmpty is true', function(assert) {
  assert.expect(1);
  this.render(hbs`{{format-number allowEmpty=true}}`);
  assert.equal(this.$().text(), '');
});

test('should handle null value when allowEmpty is true', function(assert) {
  assert.expect(1);
  this.set('somethingNull', null);
  this.render(hbs`{{format-number somethingNull allowEmpty=true}}`);
  assert.equal(this.$().text(), '');
});

test('should display the fallback if called with no value', function(assert) {
  assert.expect(1);
  this.render(hbs`{{format-number fallback="fallback value"}}`);
  assert.equal(this.$().text(), 'fallback value');
});

test('should display the fallback if called with an undefined value', function(assert) {
  assert.expect(1);
  this.render(hbs`{{format-number undefined fallback="fallback value"}}`);
  assert.equal(this.$().text(), 'fallback value');
});

test('should return a decimal as a string', function(assert) {
  assert.expect(1);
  this.set('NUM', 4.004);
  this.render(hbs`{{format-number NUM}}`);
  assert.equal(this.$().text(), '4.004');
});

test('should return a formatted string with a thousand separator', function(assert) {
  assert.expect(1);
  this.set('NUM', 40000);
  this.render(hbs`{{format-number NUM}}`);
  assert.equal(this.$().text(), '40,000');
});

test('should return a formatted string with a thousand separator and decimal', function(assert) {
  assert.expect(1);
  this.set('NUM', 40000.004);
  this.render(hbs`{{format-number NUM}}`);
  assert.equal(this.$().text(), '40,000.004');
});

test('locale can be passed as an argument', function(assert) {
  assert.expect(1);
  this.set('NUM', 4.004);
  this.render(hbs`{{format-number NUM locale="de-de"}}`);
  assert.equal(this.$().text(), '4,004');
});

test('in another locale - should return a string', function(assert) {
  assert.expect(1);
  service.setLocale('de-de');
  this.render(hbs`{{format-number 4}}`);
  assert.equal(this.$().text(), '4');
});

test('in another locale - should return a decimal as a string', function(assert) {
  assert.expect(1);
  service.setLocale('de-de');
  this.set('NUM', 4.004);
  this.render(hbs`{{format-number NUM}}`);
  assert.equal(this.$().text(), '4,004');
});

test('in another locale - should return a formatted string with a thousand separator', function(assert) {
  assert.expect(1);
  service.setLocale('de-de');
  this.set('NUM', 40000);
  this.render(hbs`{{format-number NUM}}`);
  assert.equal(this.$().text(), '40.000');
});

test('in another locale - should return a formatted string with a thousand separator and decimal', function(assert) {
  assert.expect(1);
  service.setLocale('de-de');
  this.set('NUM', 40000.004);
  this.render(hbs`{{format-number NUM}}`);
  assert.equal(this.$().text(), '40.000,004');
});

test('currency - should return a string formatted to currency', function(assert) {
  assert.expect(3);
  this.render(hbs`{{format-number 40000 format="currency" style="currency" currency="USD"}}`);
  assert.equal(this.$().text(), '$40,000.00');
  this.render(hbs`{{format-number 40000 format="currency" style="currency" currency="EUR"}}`);
  assert.equal(this.$().text(), '€40,000.00');
  this.render(hbs`{{format-number 40000 style="currency" currency="JPY"}}`);
  assert.equal(this.$().text(), '¥40,000');
});

test('should be able to combine hash options with format options', function(assert) {
  assert.expect(1);
  this.render(hbs`{{format-number 1 format="digits" minimumIntegerDigits=10}}`);
  assert.equal(this.$().text(), '0,000,000,001.00', 'should return a string formatted to a percent');
});

test('should be able to combine hash options with format options with dasherized options name', function(assert) {
  assert.expect(1);
  this.render(hbs`{{format-number 1 format="digits" minimum-integer-digits=10}}`);
  assert.equal(this.$().text(), '0,000,000,001.00', 'should return a string formatted to a percent');
});

test('used to format percentages', function(assert) {
  assert.expect(2);
  this.render(hbs`{{format-number 400 style="percent"}}`);
  assert.equal(this.$().text(), '40,000%', 'should return a string formatted to a percent');

  Ember.run(() => {
    service.setLocale('de-de');
    this.render(hbs`{{format-number 400 style="percent"}}`);

    const value = escape(this.$().text());
    assert.ok(['40%2C000%25', '40.000%A0%25'].indexOf(value) > -1, 'de should return a string formatted to a percent');
  });
});

test('should function within an `each` block helper', function(assert) {
  assert.expect(1);

  this.set('currencies', Ember.A([
    { AMOUNT: 3, CURRENCY: 'USD'},
    { AMOUNT: 8, CURRENCY: 'EUR'},
    { AMOUNT: 10, CURRENCY: 'JPY'}
  ]));

  this.render(
    hbs`
    {{#each currencies as |currency|}}{{format-number currency.AMOUNT format="currency" style="currency" currency=currency.CURRENCY}}{{/each}}
    `
  );

  assert.equal(this.$().text().trim(), '$3.00€8.00¥10.00');
});
