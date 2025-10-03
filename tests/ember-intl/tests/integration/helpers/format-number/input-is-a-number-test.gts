import {
  render,
  type TestContext as BaseTestContext,
} from '@ember/test-helpers';
import { formatNumber } from 'ember-intl';
import { setLocale, setupIntl } from 'ember-intl/test-support';
import { module, test } from 'qunit';
import { setupRenderingTest } from 'test-app-for-ember-intl/tests/helpers';

interface TestContext extends BaseTestContext {
  number: number;
}

module(
  'Integration | Helper | format-number > input is a number',
  function (hooks) {
    setupRenderingTest(hooks);
    setupIntl(hooks, 'en-us');

    hooks.beforeEach(function (this: TestContext) {
      this.number = 12345678.9;
    });

    test('it returns a string', async function (this: TestContext, assert) {
      const self = this;

      await render(
        <template>
          <div data-test-output>
            {{formatNumber self.number}}
          </div>
        </template>,
      );

      assert.dom('[data-test-output]').hasText('12,345,678.9');
    });

    test('it returns a new value when the locale is changed', async function (this: TestContext, assert) {
      const self = this;

      await render(
        <template>
          <div data-test-output>
            {{formatNumber self.number}}
          </div>
        </template>,
      );

      await setLocale('de-de');

      assert.dom('[data-test-output]').hasText('12.345.678,9');
    });

    test('we can format the number', async function (this: TestContext, assert) {
      const self = this;

      await render(
        <template>
          <div data-test-output="1">
            {{formatNumber self.number maximumSignificantDigits=5}}
          </div>

          <div data-test-output="2">
            {{formatNumber self.number notation="compact"}}
          </div>
        </template>,
      );

      assert.dom('[data-test-output="1"]').hasText('12,346,000');

      assert.dom('[data-test-output="2"]').hasText('12M');
    });

    test('we can specify the locale', async function (this: TestContext, assert) {
      const self = this;

      await render(
        <template>
          <div data-test-output>
            {{formatNumber self.number locale="de-de"}}
          </div>
        </template>,
      );

      assert.dom('[data-test-output]').hasText('12.345.678,9');
    });
  },
);
