import {
  render,
  type TestContext as BaseTestContext,
} from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';
import { setLocale, setupIntl } from 'ember-intl/test-support';
import { module, test } from 'qunit';
import { setupRenderingTest } from 'test-app-for-ember-intl/tests/helpers';

interface TestContext extends BaseTestContext {
  number: number;
}

module(
  'Integration | Helper | format-number > input is a unit',
  function (hooks) {
    setupRenderingTest(hooks);
    setupIntl(hooks, 'en-us');

    hooks.beforeEach(function (this: TestContext) {
      this.number = 1.23456789;
    });

    test('it returns a string', async function (this: TestContext, assert) {
      await render<TestContext>(hbs`
        <div data-test-output>
          {{format-number
            this.number
            style="unit"
            unit="kilometer-per-hour"
            unitDisplay="long"
          }}
        </div>
      `);

      assert.dom('[data-test-output]').hasText('1.235 kilometers per hour');
    });

    test('it returns a new value when the locale is changed', async function (this: TestContext, assert) {
      await render<TestContext>(hbs`
        <div data-test-output>
          {{format-number
            this.number
            style="unit"
            unit="kilometer-per-hour"
            unitDisplay="long"
          }}
        </div>
      `);

      await setLocale('de-de');

      assert.dom('[data-test-output]').hasText('1,235 Kilometer pro Stunde');
    });
  },
);
