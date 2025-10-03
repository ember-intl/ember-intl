import { formatTime } from 'ember-intl';

import { render, resetOnerror, setupOnerror } from '@ember/test-helpers';
import { setupIntl } from 'ember-intl/test-support';
import { module, test } from 'qunit';
import { setupRenderingTest } from 'test-app-for-ember-intl/tests/helpers';

module(
  'Integration | Helper | format-time > input is not well-defined',
  function (hooks) {
    setupRenderingTest(hooks);
    setupIntl(hooks, 'en-us');

    test('input is not an integer', async function (assert) {
      await render(<template>
      <div data-test-output>
        {{formatTime 1.1}}
      </div>
      </template>);

      assert.dom('[data-test-output]').hasText(
        new Intl.DateTimeFormat('en-us', {
          hour: 'numeric',
          minute: 'numeric',
        }).format(0),
      );
    });

    test('input is not a date string', async function (assert) {
      setupOnerror(() => {
        assert.step('@formatjs/intl throws an error');
      });

      await render(<template>
      <div data-test-output>
        {{formatTime "hello world"}}
      </div>
      </template>);

      assert.verifySteps(['@formatjs/intl throws an error']);

      resetOnerror();
    });
  },
);
