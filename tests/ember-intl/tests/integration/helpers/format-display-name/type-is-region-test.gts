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
  'Integration | Helper | format-display-name > type is region',
  function (hooks) {
    setupRenderingTest(hooks);
    setupIntl(hooks, 'en-us');

    test('it returns a string', async function (this: TestContext, assert) {
      await render(
        <template>
          <div data-test-output>
            {{formatDisplayName "DE" type="region"}}
          </div>
        </template>,
      );

      assert.dom('[data-test-output]').hasText('Germany');
    });

    test('it returns a new value when the locale is changed', async function (this: TestContext, assert) {
      await render(
        <template>
          <div data-test-output>
            {{formatDisplayName "DE" type="region"}}
          </div>
        </template>,
      );

      await setLocale('de-de');

      assert.dom('[data-test-output]').hasText('Deutschland');
    });

    test('we can format the string', async function (this: TestContext, assert) {
      await render(
        <template>
          <div data-test-output="1">
            {{formatDisplayName "US" type="region"}}
          </div>

          <div data-test-output="2">
            {{formatDisplayName "US" style="narrow" type="region"}}
          </div>

          <div data-test-output="3">
            {{formatDisplayName "US" locale="de-de" type="region"}}
          </div>
        </template>,
      );

      assert.dom('[data-test-output="1"]').hasText('United States');

      assert.dom('[data-test-output="2"]').hasText('US');

      assert.dom('[data-test-output="3"]').hasText('Vereinigte Staaten');
    });
  },
);
