import {
  render,
  type TestContext as BaseTestContext,
} from '@ember/test-helpers';
import { formatDisplayName } from 'ember-intl';
import { setLocale, setupIntl } from 'ember-intl/test-support';
import { module, test } from 'qunit';
import { setupRenderingTest } from 'test-app-for-ember-intl/tests/helpers';

interface TestContext extends BaseTestContext {
  date: string;
}

module(
  'Integration | Helper | format-display-name > type is currency',
  function (hooks) {
    setupRenderingTest(hooks);
    setupIntl(hooks, 'en-us');

    test('it returns a string', async function (this: TestContext, assert) {
      await render(
        <template>
          <div data-test-output>
            {{formatDisplayName "USD" type="currency"}}
          </div>
        </template>,
      );

      assert.dom('[data-test-output]').hasText('US Dollar');
    });

    test('it returns a new value when the locale is changed', async function (this: TestContext, assert) {
      await render(
        <template>
          <div data-test-output>
            {{formatDisplayName "USD" type="currency"}}
          </div>
        </template>,
      );

      await setLocale('de-de');

      assert.dom('[data-test-output]').hasText('US-Dollar');
    });

    test('we can format the string', async function (this: TestContext, assert) {
      await render(
        <template>
          <div data-test-output="1">
            {{formatDisplayName "MXN" type="currency"}}
          </div>

          <div data-test-output="2">
            {{formatDisplayName "MXN" style="narrow" type="currency"}}
          </div>

          <div data-test-output="3">
            {{formatDisplayName "MXN" locale="de-de" type="currency"}}
          </div>
        </template>,
      );

      assert.dom('[data-test-output="1"]').hasText('Mexican Peso');

      assert.dom('[data-test-output="2"]').hasText('Mexican Peso');

      assert.dom('[data-test-output="3"]').hasText('Mexikanischer Peso');
    });
  },
);
