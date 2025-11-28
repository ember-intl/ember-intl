import { render } from '@ember/test-helpers';
import { tKey } from 'ember-intl';
import { setLocale } from 'ember-intl/test-support';
import { module, test } from 'qunit';
import { setupRenderingTest } from 'test-app-for-ember-intl/tests/helpers';

module(
  'Integration | Helper | t-key > input is a translation key',
  function (hooks) {
    setupRenderingTest(hooks);

    test('it returns the key', async function (assert) {
      await render(
        <template>
          <div data-test-output>
            {{tKey "smoke-tests.hello.world"}}
          </div>
        </template>,
      );

      assert.dom('[data-test-output]').hasText('smoke-tests.hello.world');
    });

    test('it returns the same value when the locale is changed', async function (assert) {
      await render(
        <template>
          <div data-test-output>
            {{tKey "smoke-tests.hello.world"}}
          </div>
        </template>,
      );

      await setLocale('de-de');

      assert.dom('[data-test-output]').hasText('smoke-tests.hello.world');
    });
  },
);
