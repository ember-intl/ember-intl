import { findAll, render, rerender } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';
import type { TestContext } from 'ember-intl/test-support';
import { setupIntl } from 'ember-intl/test-support';
import { setupRenderingTest } from 'ember-qunit';
import { module, test } from 'qunit';

module('Integration | Helper | format-number', function (hooks) {
  setupRenderingTest(hooks);
  setupIntl(
    hooks,
    {},
    {
      formats: {
        number: {
          digits: { minimumFractionDigits: 2 },
          currency: { style: 'currency', minimumFractionDigits: 2 },
          currency2: {
            style: 'currency',
            currency: 'USD',
            minimumFractionDigits: 3,
          },
        },
      },
    },
  );

  test('invoke the formatNumber method', function (this: TestContext, assert) {
    assert.strictEqual(this.intl.formatNumber(100), '100');
  });

  test('number is formats unset locale (en-US)', async function (this: TestContext, assert) {
    await render(hbs`
      {{format-number 1000}}
    `);

    assert.dom().hasText('1,000');
  });

  test('should handle undefined value when allowEmpty is true', async function (this: TestContext, assert) {
    await render(hbs`
      {{format-number allowEmpty=true}}
    `);

    assert.dom().hasText('');
  });

  test('should handle null value when allowEmpty is true', async function (this: TestContext, assert) {
    await render(hbs`
      {{! @glint-nocheck }}
      {{format-number null allowEmpty=true}}
    `);

    assert.dom().hasText('');
  });

  test('should return a decimal as a string', async function (this: TestContext, assert) {
    await render(hbs`
      {{format-number 4.004}}
    `);

    assert.dom().hasText('4.004');
  });

  test('should return a formatted string with a thousand separator', async function (this: TestContext, assert) {
    await render(hbs`
      {{format-number 40000}}
    `);

    assert.dom().hasText('40,000');
  });

  test('should return a formatted string with a thousand separator and decimal', async function (this: TestContext, assert) {
    await render(hbs`
      {{format-number 40000.004}}
    `);

    assert.dom().hasText('40,000.004');
  });

  test('locale can be passed as an argument', async function (this: TestContext, assert) {
    await render(hbs`
      {{format-number 4.004 locale="de-de"}}
    `);

    assert.dom().hasText('4,004');
  });

  test('in another locale - should return a decimal as a string', async function (this: TestContext, assert) {
    this.intl.setLocale(['de-de']);

    await render(hbs`
      {{format-number 4.004}}
    `);

    assert.dom().hasText('4,004');
  });

  test('in another locale - should return a formatted string with a thousand separator', async function (this: TestContext, assert) {
    this.intl.setLocale(['de-de']);

    await render(hbs`
      {{format-number 40000}}
    `);

    assert.dom().hasText('40.000');
  });

  test('in another locale - should return a formatted string with a thousand separator and decimal', async function (this: TestContext, assert) {
    this.intl.setLocale(['de-de']);

    await render(hbs`
      {{format-number 40000.004}}
    `);

    assert.dom().hasText('40.000,004');
  });

  test('currency - should return a string formatted to currency', async function (this: TestContext, assert) {
    await render(hbs`
      {{format-number 40000 format="currency" currency="USD"}}
    `);

    assert.dom().hasText('$40,000.00');

    await render(hbs`
      {{format-number 40000 format="currency" currency="EUR"}}
    `);

    assert.dom().hasText('€40,000.00');

    await render(hbs`
      {{format-number 40000 style="currency" currency="JPY"}}
    `);

    assert.dom().hasText('¥40,000');
  });

  test('should be able to combine hash options with format options', async function (this: TestContext, assert) {
    await render(hbs`
      {{format-number 1 format="digits" minimumIntegerDigits=10}}
    `);

    assert.dom().hasText('0,000,000,001.00');
  });

  // v4 -> v5 regression
  // https://github.com/ember-intl/ember-intl/pull/1401
  test('hash options take precedence over named format options', async function (this: TestContext, assert) {
    await render(hbs`
      {{format-number 1 format="currency2"}} / {{format-number 1 format="currency2" minimumFractionDigits=0}}
    `);

    assert
      .dom()
      .hasText('$1.000 / $1', 'minimumFractionDigits overrides named format');
  });

  test('used to format percentages', async function (this: TestContext, assert) {
    await render(hbs`
      {{format-number 400 style="percent"}}
    `);

    assert.dom().hasText('40,000%');

    this.intl.setLocale('de-de');
    await rerender();

    // @ts-expect-error: this.element exists
    const value = escape(this.element.textContent!.trim());

    assert.true(
      // eslint-disable-next-line qunit/no-assert-logical-expression
      value === '40%2C000%25' || value === '40.000%A0%25',
      'de should return a string formatted to a percent',
    );
  });

  test('should function within an `each` block helper', async function (this: TestContext, assert) {
    await render(hbs`
      {{#each
        (array
          (hash amount=3 currency="USD")
          (hash amount=8 currency="EUR")
          (hash amount=10 currency="JPY")
        )
        as |object|
      }}
        <div data-test-output>
          {{format-number object.amount format="currency" style="currency" currency=object.currency}}
        </div>
      {{/each}}
   `);

    const outputs = findAll('[data-test-output]');

    assert.strictEqual(outputs.length, 3);

    assert.dom(outputs[0]).hasText('$3.00');
    assert.dom(outputs[1]).hasText('€8.00');
    assert.dom(outputs[2]).hasText('¥10.00');
  });

  test('should support notation option', async function (this: TestContext, assert) {
    await render(hbs`
      {{format-number 50000 notation="compact"}}
    `);

    assert.dom().hasText('50K');
  });
});
