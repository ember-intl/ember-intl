/**
 * Copyright 2015, Yahoo! Inc.
 * Copyrights licensed under the New BSD License. See the accompanying LICENSE file for terms.
 */

import Ember from 'ember';
import hbs from 'htmlbars-inline-precompile';
import { moduleFor, test } from 'ember-qunit';
import formatNumberHelper from 'ember-intl/helpers/format-number';

import { runAppend, runDestroy } from '../../helpers/run-append';
import createRenderer from '../../helpers/create-intl-block';

const { run:emberRun } = Ember;

let view, registry;

moduleFor('ember-intl@formatter:format-number', {
  needs: ['service:intl', 'helper:format-number'],
  beforeEach() {
    registry =  this.registry || this.container;
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

    this.render = createRenderer.call(this, undefined);
  },
  afterEach() {
    runDestroy(view);
    registry.unregister('formats:main');
  }
});

test('exists', function(assert) {
  assert.expect(1);
  assert.ok(formatNumberHelper);
});

test('invoke the formatNumber method', function(assert) {
  assert.expect(1);
  const service = this.container.lookup('service:intl');
  emberRun(() => { service.setLocale('en-us'); });
  assert.equal(service.formatNumber(100), 100);
});

test('number is formatted correctly with default locale', function(assert) {
  assert.expect(1);
  view = this.render(hbs`{{format-number 1000}}`, 'en-us');
  runAppend(view);
  assert.equal(view.$().text(), "1,000");
});

test('number is formatted correctly with locale argument', function(assert) {
  assert.expect(1);
  view = this.render(hbs`{{format-number 1000}}`, 'fr-fr');
  runAppend(view);
  // non-breaking space so we can't just compare "1 000" to "1 000"
  // since it's not a %20 space character
  assert.equal(escape(view.$().text()), "1%A0000");
});

test('should throw if called with out a value', function(assert) {
  assert.expect(1);
  view = this.render(hbs`{{format-number}}`);
  try {
    runAppend(view);
  } catch(ex) {
    assert.ok(ex, 'raised error when not value is passed to format-number');
  }
});

test('should return a string', function(assert) {
  assert.expect(1);
  view = this.render(hbs`{{format-number 4}}`, 'en-us');
  runAppend(view);
  assert.equal(view.$().text(), '4');
});

test('should return a decimal as a string', function(assert) {
  assert.expect(1);
  view = this.render(hbs`{{format-number NUM}}`, 'en-us');
  view.set('context', { NUM: 4.004 });
  runAppend(view);
  assert.equal(view.$().text(), '4.004');
});

test('should return a formatted string with a thousand separator', function(assert) {
  assert.expect(1);
  view = this.render(hbs`{{format-number NUM}}`, 'en-us');
  view.set('context', { NUM: 40000 });
  runAppend(view);
  assert.equal(view.$().text(), '40,000');
});


test('should return a formatted string with a thousand separator and decimal', function(assert) {
  assert.expect(1);
  view = this.render(hbs`{{format-number NUM}}`, 'en-us');
  view.set('context', { NUM: 40000.004 });
  runAppend(view);
  assert.equal(view.$().text(), '40,000.004');
});

test('locale can be passed as an argument', function(assert) {
  assert.expect(1);
  view = this.render(hbs`{{format-number NUM locale="de-de"}}`);
  view.set('context', { NUM: 4.004 });
  runAppend(view);
  assert.equal(view.$().text(), '4,004');
});

test('in another locale - should return a string', function(assert) {
  assert.expect(1);
  view = this.render(hbs`{{format-number 4}}`, 'de-de');
  runAppend(view);
  assert.equal(view.$().text(), '4');
});

test('in another locale - should return a decimal as a string', function(assert) {
  assert.expect(1);
  view = this.render(hbs`{{format-number NUM}}`, 'de-de');
  view.set('context', { NUM: 4.004 });
  runAppend(view);
  assert.equal(view.$().text(), '4,004');
});


test('in another locale - should return a formatted string with a thousand separator', function(assert) {
  assert.expect(1);
  view = this.render(hbs`{{format-number NUM}}`, 'de-de');
  view.set('context', { NUM: 40000 });
  runAppend(view);
  assert.equal(view.$().text(), '40.000');
});

test('in another locale - should return a formatted string with a thousand separator and decimal', function(assert) {
  assert.expect(1);
  view = this.render(hbs`{{format-number NUM}}`, 'de-de');
  view.set('context', { NUM: 40000.004 });
  runAppend(view);
  assert.equal(view.$().text(), '40.000,004');
});

test('currency - should return a string formatted to currency', function(assert) {
  assert.expect(3);
  view = this.render(hbs`{{format-number 40000 format="currency" style="currency" currency="USD"}}`, 'en-us');
  runAppend(view);
  assert.equal(view.$().text(), '$40,000.00');
  view = this.render(hbs`{{format-number 40000 format="currency" style="currency" currency="EUR"}}`, 'en-us');
  runAppend(view);
  assert.equal(view.$().text(), '€40,000.00');
  view = this.render(hbs`{{format-number 40000 style="currency" currency="JPY"}}`, 'en-us');
  runAppend(view);
  assert.equal(view.$().text(), '¥40,000');
});

test('should function within an `each` block helper', function(assert) {
  assert.expect(1);
  view = this.render(
    hbs`
    {{#each currencies as |currency|}}{{format-number currency.AMOUNT format="currency" style="currency" currency=currency.CURRENCY}}{{/each}}
    `, 'en-us'
  );

  view.set('context', {
    currencies: Ember.A([
      { AMOUNT: 3, CURRENCY: 'USD'},
      { AMOUNT: 8, CURRENCY: 'EUR'},
      { AMOUNT: 10, CURRENCY: 'JPY'}
    ])
  });

  runAppend(view);
  assert.equal(view.$().text().trim(), '$3.00€8.00¥10.00');
});

test('should be able to combine hash options with format options', function(assert) {
  assert.expect(1);
  view = this.render(hbs`{{format-number 1 format="digits" minimumIntegerDigits=10}}`, 'en-us');
  runAppend(view);
  assert.equal(view.$().text(), '0,000,000,001.00', 'should return a string formatted to a percent');
});

test('should be able to combine hash options with format options with dasherized options name', function(assert) {
  assert.expect(1);
  view = this.render(hbs`{{format-number 1 format="digits" minimum-integer-digits=10}}`, 'en-us');
  runAppend(view);
  assert.equal(view.$().text(), '0,000,000,001.00', 'should return a string formatted to a percent');
});

test('used to format percentages', function(assert) {
  assert.expect(2);
  view = this.render(hbs`{{format-number 400 style="percent"}}`, 'en-us');
  runAppend(view);
  assert.equal(view.$().text(), '40,000%', 'should return a string formatted to a percent');
  view = this.render(hbs`{{format-number 400 style="percent"}}`, 'de-de');
  runAppend(view);
  assert.equal(escape(view.$().text()), '40.000%A0%25', 'de should return a string formatted to a percent');
});
