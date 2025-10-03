import { render, resetOnerror, setupOnerror } from '@ember/test-helpers';
import { formatDate } from 'ember-intl';
import { setupIntl } from 'ember-intl/test-support';
import { module, test } from 'qunit';
import { setupRenderingTest } from 'test-app-for-ember-intl/tests/helpers';

module(
  'Integration | Helper | format-date > input is not well-defined',
  function (hooks) {
    setupRenderingTest(hooks);
    setupIntl(hooks, 'en-us');

    test('input is not an integer', async function (assert) {
      await render(
        <template>
          <div data-test-output>
            {{formatDate 1.1}}
          </div>
        </template>,
      );

      assert.dom('[data-test-output]').hasText('1/1/1970');
    });

    test('input is not a date string', async function (assert) {
      setupOnerror(() => {
        assert.step('@formatjs/intl throws an error');
      });

      await render(
        <template>
          <div data-test-output>
            {{formatDate "hello world"}}
          </div>
        </template>,
      );

      assert.verifySteps(['@formatjs/intl throws an error']);

      resetOnerror();
    });
  },
);
