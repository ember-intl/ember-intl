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
  'Integration | Helper | format-display-name > type is language',
  function (hooks) {
    setupRenderingTest(hooks);
    setupIntl(hooks, 'en-us');

    test('it returns a string', async function (this: TestContext, assert) {
      await render(
        <template>
          <div data-test-output>
            {{formatDisplayName "de-de" type="language"}}
          </div>
        </template>,
      );

      assert.dom('[data-test-output]').hasText('German (Germany)');
    });

    test('it returns a new value when the locale is changed', async function (this: TestContext, assert) {
      await render(
        <template>
          <div data-test-output>
            {{formatDisplayName "de-de" type="language"}}
          </div>
        </template>,
      );

      await setLocale('de-de');

      assert.dom('[data-test-output]').hasText('Deutsch (Deutschland)');
    });

    test('we can format the string', async function (this: TestContext, assert) {
      await render(
        <template>
          <div data-test-output="1">
            {{formatDisplayName "nl-be" type="language"}}
          </div>

          <div data-test-output="2">
            {{formatDisplayName
              "nl-be"
              languageDisplay="standard"
              type="language"
            }}
          </div>

          <div data-test-output="3">
            {{formatDisplayName "nl-be" locale="de-de" type="language"}}
          </div>
        </template>,
      );

      assert.dom('[data-test-output="1"]').hasText('Flemish');

      assert.dom('[data-test-output="2"]').hasText('Dutch (Belgium)');

      assert.dom('[data-test-output="3"]').hasText('Flämisch');
    });
  },
);
