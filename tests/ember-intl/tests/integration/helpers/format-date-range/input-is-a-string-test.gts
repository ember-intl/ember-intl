import { formatDateRange } from 'ember-intl';

import {
  render,
  type TestContext as BaseTestContext,
} from '@ember/test-helpers';
import { setLocale, setupIntl } from 'ember-intl/test-support';
import { module, test } from 'qunit';
import { setupRenderingTest } from 'test-app-for-ember-intl/tests/helpers';

interface TestContext extends BaseTestContext {
  from: string;
  to: string;
}

module(
  'Integration | Helper | format-date-range > input is a string',
  function (hooks) {
    setupRenderingTest(hooks);
    setupIntl(hooks, 'en-us');

    hooks.beforeEach(function (this: TestContext) {
      this.from = new Date('2014-01-23T18:00:44').toISOString();
      this.to = new Date('2014-01-26T19:30:34').toISOString();
    });

    test('it returns a string', async function (this: TestContext, assert) {
      const self = this;




      await render<TestContext>(<template>
      <div data-test-output>
        {{formatDateRange self.from self.to}}
      </div>
      </template>);

      assert
        .dom('[data-test-output]')
        .hasText(/1\/23\/2014\s–\s1\/26\/2014/)
        .hasText('1/23/2014 – 1/26/2014');
    });

    test('it returns a new value when the locale is changed', async function (this: TestContext, assert) {
      const self = this;




      await render<TestContext>(<template>
      <div data-test-output>
        {{formatDateRange self.from self.to}}
      </div>
      </template>);

      await setLocale('de-de');

      assert
        .dom('[data-test-output]')
        .hasText(/23\.–26\.01\.2014/)
        .hasText('23.–26.01.2014');
    });

    test('we can format the date', async function (this: TestContext, assert) {
      const self = this;




      await render<TestContext>(<template>
      <div data-test-output="2">
        {{formatDateRange
          self.from
          self.to
          hour="numeric"
          minute="numeric"
          month="long"
        }}
      </div>
      </template>);

      assert
        .dom('[data-test-output="2"]')
        .hasText(/January 23 at 6:00\sPM\s–\sJanuary 26 at 7:30\sPM/)
        .hasText('January 23 at 6:00 PM – January 26 at 7:30 PM');
    });

    test('we can specify the time zone', async function (this: TestContext, assert) {
      const self = this;




      await render<TestContext>(<template>
      <div data-test-output>
        {{formatDateRange self.from self.to timeZone="UTC"}}
      </div>
      </template>);

      assert
        .dom('[data-test-output]')
        .hasText(/1\/23\/2014\s–\s1\/26\/2014/)
        .hasText('1/23/2014 – 1/26/2014');
    });
  },
);
