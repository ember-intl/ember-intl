import { formatRelativeTime } from 'ember-intl';

import { render } from '@ember/test-helpers';
import { setupIntl } from 'ember-intl/test-support';
import { module, test } from 'qunit';
import { setupRenderingTest } from 'test-app-for-ember-intl/tests/helpers';

module(
  'Integration | Helper | format-relative-time > input is falsy',
  function (hooks) {
    setupRenderingTest(hooks);
    setupIntl(hooks, 'en-us');

    test('input is 0', async function (assert) {
      await render(<template>
      <div data-test-output>
        {{formatRelativeTime 0 unit="year"}}
      </div>
      </template>);

      assert.dom('[data-test-output]').hasText('in 0 years');
    });

    test('input is null', async function (assert) {
      await render(<template>
      <div data-test-output>
        {{formatRelativeTime null unit="year"}}
      </div>
      </template>);

      assert.dom('[data-test-output]').hasText('');
    });

    test('input is undefined', async function (assert) {
      await render(<template>
      <div data-test-output>
        {{formatRelativeTime undefined unit="year"}}
      </div>
      </template>);

      assert.dom('[data-test-output]').hasText('');
    });
  },
);
