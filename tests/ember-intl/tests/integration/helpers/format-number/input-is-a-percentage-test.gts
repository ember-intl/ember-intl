import { formatNumber } from 'ember-intl';

import {
  render,
  type TestContext as BaseTestContext,
} from '@ember/test-helpers';
import { setLocale, setupIntl } from 'ember-intl/test-support';
import { module, test } from 'qunit';
import { setupRenderingTest } from 'test-app-for-ember-intl/tests/helpers';

interface TestContext extends BaseTestContext {
  number: number;
}

module(
  'Integration | Helper | format-number > input is a percentage',
  function (hooks) {
    setupRenderingTest(hooks);
    setupIntl(hooks, 'en-us');

    hooks.beforeEach(function (this: TestContext) {
      this.number = 1.23456789;
    });

    test('it returns a string', async function (this: TestContext, assert) {
      const self = this;




      await render<TestContext>(<template>
      <div data-test-output>
        {{formatNumber self.number style="percent"}}
      </div>
      </template>);

      assert.dom('[data-test-output]').hasText('123%');
    });

    test('it returns a new value when the locale is changed', async function (this: TestContext, assert) {
      const self = this;




      await render<TestContext>(<template>
      <div data-test-output>
        {{formatNumber self.number style="percent"}}
      </div>
      </template>);

      await setLocale('de-de');

      assert.dom('[data-test-output]').hasText(/123\s%/);
    });
  },
);
