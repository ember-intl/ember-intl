import {
  render,
  type TestContext as BaseTestContext,
} from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';
import { setLocale, setupIntl } from 'ember-intl/test-support';
import { module, test } from 'qunit';
import { setupRenderingTest } from 'test-app-for-ember-intl/tests/helpers';

interface TestContext extends BaseTestContext {
  from: number;
  to: number;
}

module(
  'Integration | Helper | format-date-time-range > input is an integer',
  function (hooks) {
    setupRenderingTest(hooks);
    setupIntl(hooks, 'en-us');

    hooks.beforeEach(function (this: TestContext) {
      this.from = new Date('2014-01-23T18:00:44').getTime();
      this.to = new Date('2014-01-26T19:30:34').getTime();
    });

    test('it returns a string', async function (this: TestContext, assert) {
      await render<TestContext>(hbs`
        <div data-test-output>
          {{format-date-time-range this.from this.to}}
        </div>
      `);

      assert.dom('[data-test-output]').hasText('1/23/2014 – 1/26/2014');
    });

    test('it returns a new value when the locale is changed', async function (this: TestContext, assert) {
      await render<TestContext>(hbs`
        <div data-test-output>
          {{format-date-time-range this.from this.to}}
        </div>
      `);

      await setLocale('de-de');

      assert.dom('[data-test-output]').hasText('23.–26.01.2014');
    });

    test('we can format the date', async function (this: TestContext, assert) {
      await render<TestContext>(hbs`
        <div data-test-output="1">
          {{format-date-time-range this.from this.to format='hhmmss'}}
        </div>

        <div data-test-output="2">
          {{format-date-time-range
            this.from
            this.to
            hour="2-digit"
            minute="numeric"
            month="long"
          }}
        </div>
      `);

      // apparently formatDateTimeRange does not support defaultFormats in formatjs
      // assert.dom('[data-test-output="1"]').hasText('6:00:44 PM');

      assert
        .dom('[data-test-output="2"]')
        .hasText('January 23 at 6:00 PM – January 26 at 7:30 PM');
    });

    test('we can specify the time zone', async function (this: TestContext, assert) {
      await render<TestContext>(hbs`
        <div data-test-output>
          {{format-date-time-range this.from this.to timeZone='UTC'}}
        </div>
      `);

      assert.dom('[data-test-output]').hasText('1/23/2014 – 1/26/2014');
    });
  },
);
