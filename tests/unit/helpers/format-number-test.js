import { A } from '@ember/array';
import { run } from '@ember/runloop';
import hbs from 'htmlbars-inline-precompile';
import { module, test, skip } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import formatNumberHelper from 'ember-intl/helpers/format-number';

module('format-number', function(hooks) {
  setupRenderingTest(hooks);

  hooks.beforeEach(function() {
    this.intl = this.owner.lookup('service:intl');
    this.intl.set('formats', {
      number: { digits: { minimumFractionDigits: 2 }, currency: { style: 'currency', minimumFractionDigits: 2 } }
    });
  });

  test('exists', function(assert) {
    assert.expect(1);
    assert.ok(formatNumberHelper);
  });

  test('invoke the formatNumber method', function(assert) {
    assert.expect(1);
    assert.equal(this.intl.formatNumber(100), 100);
  });

  test('number is formats unset locale (en-US)', async function(assert) {
    assert.expect(1);
    await render(hbs`{{format-number 1000}}`);
    assert.equal(this.element.textContent, '1,000');
  });

  test('number is formatted correctly with active service locale', async function(assert) {
    assert.expect(1);
    this.intl.setLocale(['pt-br']);
    await render(hbs`{{format-number 1000}}`);
    assert.equal(this.element.textContent, '1.000');
  });

  skip('should throw if called with out a value', function(/*assert*/) {
    // assert.expect(1);
    // expectError(() => render(hbs`{{format-number}}`), ex => assert.ok(ex));
  });

  test('should return a string', async function(assert) {
    assert.expect(1);
    await render(hbs`{{format-number 4}}`);
    assert.equal(this.element.textContent, '4');
  });

  test('should handle undefined value when allowEmpty is true', async function(assert) {
    assert.expect(1);
    await render(hbs`{{format-number allowEmpty=true}}`);
    assert.equal(this.element.textContent, '');
  });

  test('should handle null value when allowEmpty is true', async function(assert) {
    assert.expect(1);
    this.set('somethingNull', null);
    await render(hbs`{{format-number somethingNull allowEmpty=true}}`);
    assert.equal(this.element.textContent, '');
  });

  test('should return a decimal as a string', async function(assert) {
    assert.expect(1);
    this.set('NUM', 4.004);
    await render(hbs`{{format-number NUM}}`);
    assert.equal(this.element.textContent, '4.004');
  });

  test('should return a formatted string with a thousand separator', async function(assert) {
    assert.expect(1);
    this.set('NUM', 40000);
    await render(hbs`{{format-number NUM}}`);
    assert.equal(this.element.textContent, '40,000');
  });

  test('should return a formatted string with a thousand separator and decimal', async function(assert) {
    assert.expect(1);
    this.set('NUM', 40000.004);
    await render(hbs`{{format-number NUM}}`);
    assert.equal(this.element.textContent, '40,000.004');
  });

  test('locale can be passed as an argument', async function(assert) {
    assert.expect(1);
    this.set('NUM', 4.004);
    await render(hbs`{{format-number NUM locale="de-de"}}`);
    assert.equal(this.element.textContent, '4,004');
  });

  test('in another locale - should return a string', async function(assert) {
    assert.expect(1);
    this.intl.setLocale(['de-de']);
    await render(hbs`{{format-number 4}}`);
    assert.equal(this.element.textContent, '4');
  });

  test('in another locale - should return a decimal as a string', async function(assert) {
    assert.expect(1);
    this.intl.setLocale(['de-de']);
    this.set('NUM', 4.004);
    await render(hbs`{{format-number NUM}}`);
    assert.equal(this.element.textContent, '4,004');
  });

  test('in another locale - should return a formatted string with a thousand separator', async function(assert) {
    assert.expect(1);
    this.intl.setLocale(['de-de']);
    this.set('NUM', 40000);
    await render(hbs`{{format-number NUM}}`);
    assert.equal(this.element.textContent, '40.000');
  });

  test('in another locale - should return a formatted string with a thousand separator and decimal', async function(assert) {
    assert.expect(1);
    this.intl.setLocale(['de-de']);
    this.set('NUM', 40000.004);
    await render(hbs`{{format-number NUM}}`);
    assert.equal(this.element.textContent, '40.000,004');
  });

  test('currency - should return a string formatted to currency', async function(assert) {
    assert.expect(3);
    await render(hbs`{{format-number 40000 format="currency" style="currency" currency="USD"}}`);
    assert.equal(this.element.textContent, '$40,000.00');
    await render(hbs`{{format-number 40000 format="currency" style="currency" currency="EUR"}}`);
    assert.equal(this.element.textContent, '€40,000.00');
    await render(hbs`{{format-number 40000 style="currency" currency="JPY"}}`);
    assert.equal(this.element.textContent, '¥40,000');
  });

  test('should be able to combine hash options with format options', async function(assert) {
    assert.expect(1);
    await render(hbs`{{format-number 1 format="digits" minimumIntegerDigits=10}}`);
    assert.equal(this.element.textContent, '0,000,000,001.00', 'should return a string formatted to a percent');
  });

  test('should be able to combine hash options with format options with dasherized options name', async function(assert) {
    assert.expect(1);
    await render(hbs`{{format-number 1 format="digits" minimum-integer-digits=10}}`);
    assert.equal(this.element.textContent, '0,000,000,001.00', 'should return a string formatted to a percent');
  });

  test('used to format percentages', async function(assert) {
    assert.expect(2);
    await render(hbs`{{format-number 400 style="percent"}}`);
    assert.equal(this.element.textContent, '40,000%', 'should return a string formatted to a percent');

    run(() => this.intl.setLocale('de-de'));
    await render(hbs`{{format-number 400 style="percent"}}`);

    const value = escape(this.element.textContent);
    assert.ok(['40%2C000%25', '40.000%A0%25'].indexOf(value) > -1, 'de should return a string formatted to a percent');
  });

  test('should function within an `each` block helper', async function(assert) {
    assert.expect(1);

    this.set(
      'currencies',
      A([{ AMOUNT: 3, CURRENCY: 'USD' }, { AMOUNT: 8, CURRENCY: 'EUR' }, { AMOUNT: 10, CURRENCY: 'JPY' }])
    );

    await render(
      hbs`
      {{#each currencies as |currency|}}{{format-number currency.AMOUNT format="currency" style="currency" currency=currency.CURRENCY}}{{/each}}
      `
    );

    assert.equal(this.element.textContent.trim(), '$3.00€8.00¥10.00');
  });

  test('should support notation option', async function(assert) {
    if (!('notation' in new Intl.NumberFormat().resolvedOptions())) {
      // test running in unsupported browser
      assert.ok(true);

      return;
    }

    assert.expect(1);
    await render(hbs`{{format-number 50000 notation="compact"}}`);
    assert.equal(this.element.textContent, '50K');
  });
});
