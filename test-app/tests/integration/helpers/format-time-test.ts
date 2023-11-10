import {
  render,
  type TestContext as BaseTestContext,
} from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';
import type { IntlService } from 'ember-intl';
import { setupIntl } from 'ember-intl/test-support';
import { module, test } from 'qunit';
import { setupRenderingTest } from 'test-app/tests/helpers';

interface TestContext extends BaseTestContext {
  date: number;
  dateString: string;
  intl: IntlService;
}

module('Integration | Helper | format-time', function (hooks) {
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

  hooks.beforeEach(function (this: TestContext) {
    this.date = 1390518044403;
    this.dateString = 'Thu Jan 23 2014 18:00:44 GMT-0500 (EST)';
    this.intl = this.owner.lookup('service:intl') as IntlService;
  });

  test('invoke formatTime directly', function (this: TestContext, assert) {
    const output = this.intl.formatTime(this.date, {
      timeZone: 'UTC',
      locale: 'fr-fr',
    });

    const expectedValue = new Intl.DateTimeFormat('fr-fr', {
      hour: 'numeric',
      minute: 'numeric',
      timeZone: 'UTC',
    }).format(this.date);

    // Try both for browser Intl data inconsistencies
    assert.strictEqual(output, expectedValue);
  });

  test('invoke formatTime directly with format', function (this: TestContext, assert) {
    const output = this.intl.formatTime(this.date, {
      format: 'test',
      locale: 'fr-fr',
    });

    const expectedValue = new Intl.DateTimeFormat('fr-fr', {
      hour: 'numeric',
      minute: 'numeric',
      timeZone: 'UTC',
    }).format(this.date);

    // Try both for browser Intl because of data inconsistencies between implementations
    assert.strictEqual(output, expectedValue);
  });

  test('should support allowEmpty', async function (this: TestContext, assert) {
    await render(hbs`
      {{format-time allowEmpty=true}}
    `);

    assert.dom().hasText('');
  });

  test('it should return a formatted string from a date string', async function (this: TestContext, assert) {
    // Must provide `timeZone` because: https://github.com/ember-intl/ember-intl/issues/21
    await render<TestContext>(hbs`
      {{format-time this.dateString timeZone='UTC'}}
    `);

    assert.dom().hasText('11:00 PM');
  });

  test('it should return a formatted string formatted with formatConfig key', async function (this: TestContext, assert) {
    // Must provide `timeZone` because: https://github.com/ember-intl/ember-intl/issues/21
    await render<TestContext>(hbs`
      {{format-time this.dateString format='example'}}
    `);

    assert.dom().hasText('11:00 PM UTC');
  });

  test('it should return a formatted string formatted using formatConfig key with inline locale', async function (this: TestContext, assert) {
    // Must provide `timeZone` because: https://github.com/ember-intl/ember-intl/issues/21
    await render<TestContext>(hbs`
      {{format-time this.dateString locale='de' format='example'}}
    `);

    assert.dom().hasText('23:00 UTC');
  });

  test('it should return a formatted string from a timestamp', async function (this: TestContext, assert) {
    // Must provide `timeZone` because: https://github.com/ember-intl/ember-intl/issues/21
    await render<TestContext>(hbs`
      {{format-time this.date timeZone='UTC'}}
    `);

    assert.dom().hasText('11:00 PM');
  });

  test('it should return a formatted string of just the time', async function (this: TestContext, assert) {
    await render<TestContext>(hbs`
      {{format-time this.date hour='numeric' minute='numeric' timeZone='UTC'}}
    `);

    assert.dom().hasText('11:00 PM');
  });

  test('it should format the epoch timestamp', async function (this: TestContext, assert) {
    await render(hbs`{{format-time 0}}`);

    assert.dom().hasText(
      new Intl.DateTimeFormat('en-us', {
        hour: 'numeric',
        minute: 'numeric',
      }).format(0),
    );
  });

  test('should support hourCycle', async function (this: TestContext, assert) {
    this.intl.setLocale(['en-ie']);

    await render(hbs`
      {{format-time "2020-04-30T00:00:00.000Z" format="test2"}}
    `);

    assert.dom().hasText('00:00', 'en-ie time format defaults to h23');

    await render(hbs`
      {{format-time "2020-04-30T00:00:00.000Z" format="test2" hourCycle="h12"}}
    `);

    assert.dom().hasText('12:00 a.m.', 'en-ie hourCycle overridden');
  });
});
