import { render } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';
import formatTimeHelper from 'ember-intl/helpers/format-time';
import type { TestContext } from 'ember-intl/test-support';
import { setupIntl } from 'ember-intl/test-support';
import { setupRenderingTest } from 'ember-qunit';
import { module, test } from 'qunit';

const date = 1390518044403;

module('format-time-test', function (hooks) {
  setupRenderingTest(hooks);
  setupIntl(
    hooks,
    {},
    {
      formats: {
        time: {
          test: { timeZone: 'UTC' },
          test2: { timeZone: 'UTC', hour: 'numeric', minute: 'numeric' },
          example: { timeZone: 'utc', timeZoneName: 'short' },
        },
      },
    },
  );

  test('exists', function (this: TestContext, assert) {
    assert.expect(1);
    assert.ok(formatTimeHelper);
  });

  test('invoke formatTime directly', function (this: TestContext, assert) {
    assert.expect(1);

    const output = this.intl.formatTime(date, {
      timeZone: 'UTC',
      locale: 'fr-fr',
    });

    // Try both for browser Intl data inconsistencies
    assert.strictEqual(
      output,
      new Intl.DateTimeFormat('fr-fr', {
        hour: 'numeric',
        minute: 'numeric',
        timeZone: 'UTC',
      }).format(date),
    );
  });

  test('invoke formatTime directly with format', function (this: TestContext, assert) {
    assert.expect(1);
    const output = this.intl.formatTime(date, {
      format: 'test',
      locale: 'fr-fr',
    });

    // Try both for browser Intl because of data inconsistencies between implementations
    assert.strictEqual(
      output,
      new Intl.DateTimeFormat('fr-fr', {
        hour: 'numeric',
        minute: 'numeric',
        timeZone: 'UTC',
      }).format(date),
    );
  });

  test('should support allowEmpty', async function (this: TestContext, assert) {
    assert.expect(1);
    await render(hbs`{{format-time allowEmpty=true}}`);
    assert.strictEqual(this.element.textContent, '');
  });

  test('it should return a formatted string from a date string', async function (this: TestContext, assert) {
    assert.expect(1);
    this.set('dateString', 'Thu Jan 23 2014 18:00:44 GMT-0500 (EST)');

    // Must provide `timeZone` because: https://github.com/ember-intl/ember-intl/issues/21
    await render(hbs`{{format-time this.dateString timeZone='UTC'}}`);
    assert.strictEqual(this.element.textContent, '11:00 PM');
  });

  test('it should return a formatted string formatted with formatConfig key', async function (this: TestContext, assert) {
    assert.expect(1);

    this.set('dateString', 'Thu Jan 23 2014 18:00:44 GMT-0500 (EST)');

    // Must provide `timeZone` because: https://github.com/ember-intl/ember-intl/issues/21
    await render(hbs`{{format-time this.dateString format='example'}}`);
    assert.strictEqual(this.element.textContent, '11:00 PM UTC');
  });

  test('it should return a formatted string formatted using formatConfig key with inline locale', async function (this: TestContext, assert) {
    assert.expect(1);

    this.set('dateString', 'Thu Jan 23 2014 18:00:44 GMT-0500 (EST)');

    // Must provide `timeZone` because: https://github.com/ember-intl/ember-intl/issues/21
    await render(
      hbs`{{format-time this.dateString locale='de' format='example'}}`,
    );
    assert.strictEqual(this.element.textContent, '23:00 UTC');
  });

  test('it should return a formatted string from a timestamp', async function (this: TestContext, assert) {
    assert.expect(1);
    this.set('date', date);

    // Must provide `timeZone` because: https://github.com/ember-intl/ember-intl/issues/21
    await render(hbs`{{format-time this.date timeZone='UTC'}}`);
    assert.strictEqual(this.element.textContent, '11:00 PM');
  });

  test('it should return a formatted string of just the time', async function (this: TestContext, assert) {
    assert.expect(1);
    this.set('date', date);
    await render(
      hbs`{{format-time this.date hour='numeric' minute='numeric' timeZone='UTC'}}`,
    );
    assert.strictEqual(this.element.textContent, '11:00 PM');
  });

  test('it should format the epoch timestamp', async function (this: TestContext, assert) {
    assert.expect(1);
    await render(hbs`{{format-time 0}}`);
    assert.strictEqual(
      this.element.textContent,
      new Intl.DateTimeFormat('en-us', {
        hour: 'numeric',
        minute: 'numeric',
      }).format(0),
    );
  });

  test('should support hourCycle', async function (this: TestContext, assert) {
    assert.expect(2);

    this.intl.setLocale(['en-ie']);

    await render(
      hbs`{{format-time "2020-04-30T00:00:00.000Z" format="test2"}}`,
    );

    assert.strictEqual(
      this.element.textContent,
      '00:00',
      'en-ie time format defaults to h23',
    );

    await render(
      hbs`{{format-time "2020-04-30T00:00:00.000Z" format="test2" hourCycle="h12"}}`,
    );

    assert.strictEqual(
      this.element.textContent,
      '12:00 a.m.',
      'en-ie hourCycle overridden',
    );
  });
});
