import { render } from '@ember/test-helpers';
import { formatMessage } from 'ember-intl';
import { setupIntl } from 'ember-intl/test-support';
import { module, test } from 'qunit';
import { setupRenderingTest } from 'test-app-for-ember-intl/tests/helpers';

module(
  'Integration | Helper | format-message > input is falsy',
  function (hooks) {
    setupRenderingTest(hooks);
    setupIntl(hooks, 'en-us');

    test('input is null', async function (assert) {
      await render(
        <template>
          <div data-test-output>
            {{formatMessage null}}
          </div>
        </template>,
      );

      assert.dom('[data-test-output]').hasText('');
    });

    test('input is undefined', async function (assert) {
      await render(
        <template>
          <div data-test-output>
            {{formatMessage undefined}}
          </div>
        </template>,
      );

      assert.dom('[data-test-output]').hasText('');
    });
  },
);
