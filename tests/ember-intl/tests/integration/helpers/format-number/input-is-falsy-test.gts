import { formatNumber } from 'ember-intl';

import { render } from '@ember/test-helpers';
import { setupIntl } from 'ember-intl/test-support';
import { module, test } from 'qunit';
import { setupRenderingTest } from 'test-app-for-ember-intl/tests/helpers';

module(
  'Integration | Helper | format-number > input is falsy',
  function (hooks) {
    setupRenderingTest(hooks);
    setupIntl(hooks, 'en-us');

    test('input is 0', async function (assert) {
      await render(<template>
      <div data-test-output>
        {{formatNumber 0}}
      </div>
      </template>);

      assert.dom('[data-test-output]').hasText('0');
    });

    test('input is null', async function (assert) {
      await render(<template>
      <div data-test-output>
        {{formatNumber null}}
      </div>
      </template>);

      assert.dom('[data-test-output]').hasText('');
    });

    test('input is undefined', async function (assert) {
      await render(<template>
      <div data-test-output>
        {{formatNumber undefined}}
      </div>
      </template>);

      assert.dom('[data-test-output]').hasText('');
    });
  },
);
