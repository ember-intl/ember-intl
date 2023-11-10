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
}

module('Integration | Helper | format-date', function (hooks) {
  setupRenderingTest(hooks);
  setupIntl(hooks);

  hooks.beforeEach(function (this: TestContext) {
    this.date = 1390518044403;
    this.dateString = 'Thu Jan 23 2014 18:00:44 GMT-0500 (EST)';
  });

  test('invoke the formatDate directly', function (this: TestContext, assert) {
    const intl = this.owner.lookup('service:intl') as IntlService;

    const output = intl.formatDate(this.date, {
      locale: 'en-us',
      timeZone: 'UTC',
    });

    assert.strictEqual(output, '1/23/2014');
  });

  test('should render empty string for a null value', async function (assert) {
    await render(hbs`
      {{format-date null}}
    `);

    assert.dom().hasText('');
  });

  test('should render empty string for an empty string value', async function (assert) {
    await render(hbs`
      {{format-date ''}}
    `);

    assert.dom().hasText('');
  });

  test('should render empty string for an undefined value', async function (assert) {
    await render(hbs`
      {{format-date undefined}}
    `);

    assert.dom().hasText('');
  });

  test('should render epoch date for a null value when allow empty is false', async function (this: TestContext, assert) {
    await render(hbs`
      {{format-date null allowEmpty=false}}
    `);

    assert.dom().hasText(new Intl.DateTimeFormat('en-us').format(0));
  });

  test('should support allowEmpty', async function (assert) {
    await render(hbs`
      {{format-date allowEmpty=true}}
    `);
    assert.dom().hasText('');
  });

  test('it should return a formatted string from a date string', async function (this: TestContext, assert) {
    // Must provide `timeZone` because: https://github.com/ember-intl/ember-intl/issues/21
    await render<TestContext>(hbs`
      {{format-date this.dateString timeZone='UTC'}}
    `);

    assert.dom().hasText('1/23/2014');
  });

  test('it should return a formatted string from a timestamp', async function (this: TestContext, assert) {
    // Must provide `timeZone` because: https://github.com/ember-intl/ember-intl/issues/21
    await render<TestContext>(hbs`
      {{format-date this.date timeZone='UTC'}}
    `);

    assert.dom().hasText('1/23/2014');
  });

  test('it should return a formatted string of just the date', async function (this: TestContext, assert) {
    await render<TestContext>(hbs`
      {{format-date
        this.date
        hour="numeric"
        minute="numeric"
        timeZone="UTC"
      }}
    `);

    assert.dom().hasText('11:00 PM');
  });

  test('it should format the epoch timestamp', async function (this: TestContext, assert) {
    await render(hbs`{{format-date 0}}`);

    assert.dom().hasText(new Intl.DateTimeFormat('en-us').format(0));
  });
});
