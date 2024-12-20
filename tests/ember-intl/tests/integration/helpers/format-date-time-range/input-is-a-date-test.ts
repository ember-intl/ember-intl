import {
  render,
  type TestContext as BaseTestContext,
} from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';
import { setLocale, setupIntl } from 'ember-intl/test-support';
import { module, test } from 'qunit';
import { setupRenderingTest } from 'test-app-for-ember-intl/tests/helpers';

interface TestContext extends BaseTestContext {
  from: Date;
  to: Date;
}

module(
  'Integration | Helper | format-date-time-range > input is a Date',
  function (hooks) {
    setupRenderingTest(hooks);
    setupIntl(hooks, 'en-us');

    hooks.beforeEach(function (this: TestContext) {
      this.from = new Date('2014-01-23T18:00:44');
      this.to = new Date('2015-02-26T19:30:34');
    });

    test('it returns a string', async function (this: TestContext, assert) {
      await render<TestContext>(hbs`
        <div data-test-output>
          {{format-date-time-range this.from this.to}}
        </div>
      `);

      assert.dom('[data-test-output]').hasText('1/23/2014 – 2/26/2015');
    });

    test('it returns a new value when the locale is changed', async function (this: TestContext, assert) {
      await render<TestContext>(hbs`
        <div data-test-output>
          {{format-date-time-range this.from this.to}}
        </div>
      `);

      await setLocale('de-de');

      assert.dom('[data-test-output]').hasText('23.01.2014 – 26.02.2015');
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
            hour="numeric"
            minute="numeric"
            month="long"
          }}
        </div>
      `);

      // apparently formatDateTimeRange does not support defaultFormats in formatjs
      // assert.dom('[data-test-output="1"]').hasText('6:00:44 PM');

      assert
        .dom('[data-test-output="2"]')
        .hasText('January 23, 2014 at 6:00 PM – February 26, 2015 at 7:30 PM');
    });

    test('we can specify the time zone', async function (this: TestContext, assert) {
      await render<TestContext>(hbs`
        <div data-test-output>
          {{format-date-time-range this.from this.to timeZone='UTC'}}
        </div>
      `);

      assert.dom('[data-test-output]').hasText('1/23/2014 – 2/26/2015');
    });
  },
);
