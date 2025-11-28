import { render } from '@ember/test-helpers';
import { tKey } from 'ember-intl';
import { module, test } from 'qunit';
import { setupRenderingTest } from 'test-app-for-ember-intl/tests/helpers';

module(
  'Integration | Helper | t-key > input is not well-defined',
  function (hooks) {
    setupRenderingTest(hooks);

    test('input is null', async function (assert) {
      await render(
        <template>
          <div data-test-output>
            {{! @glint-expect-error }}
            {{tKey null}}
          </div>
        </template>,
      );

      assert.dom('[data-test-output]').hasText('');
    });

    test('input is undefined', async function (assert) {
      await render(
        <template>
          <div data-test-output>
            {{! @glint-expect-error }}
            {{tKey undefined}}
          </div>
        </template>,
      );

      assert.dom('[data-test-output]').hasText('');
    });

    test('input is an empty string', async function (assert) {
      await render(
        <template>
          <div data-test-output>
            {{tKey ""}}
          </div>
        </template>,
      );

      assert.dom('[data-test-output]').hasText('');
    });

    test('input is false', async function (assert) {
      await render(
        <template>
          <div data-test-output>
            {{! @glint-expect-error }}
            {{tKey false}}
          </div>
        </template>,
      );

      assert.dom('[data-test-output]').hasText('false');
    });

    test('input is true', async function (assert) {
      await render(
        <template>
          <div data-test-output>
            {{! @glint-expect-error }}
            {{tKey true}}
          </div>
        </template>,
      );

      assert.dom('[data-test-output]').hasText('true');
    });
  },
);
