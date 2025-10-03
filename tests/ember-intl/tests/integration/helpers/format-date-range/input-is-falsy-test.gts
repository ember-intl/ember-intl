import { render } from '@ember/test-helpers';
import { formatDateRange } from 'ember-intl';
import { setupIntl } from 'ember-intl/test-support';
import { module, test } from 'qunit';
import { setupRenderingTest } from 'test-app-for-ember-intl/tests/helpers';

module(
  'Integration | Helper | format-date-range > input is falsy',
  function (hooks) {
    setupRenderingTest(hooks);
    setupIntl(hooks, 'en-us');

    test('input is 0', async function (assert) {
      await render(
        <template>
          <div data-test-output>
            {{formatDateRange 0 0}}
          </div>
        </template>,
      );

      assert
        .dom('[data-test-output]')
        .hasText(new Intl.DateTimeFormat('en-us').formatRange(0, 0));
    });

    test('input is an empty string', async function (assert) {
      await render(
        <template>
          <div data-test-output>
            {{formatDateRange "" ""}}
          </div>
        </template>,
      );

      assert
        .dom('[data-test-output]')
        .hasText(new Intl.DateTimeFormat('en-us').formatRange(0, 0));
    });

    test('input is null', async function (assert) {
      await render(
        <template>
          <div data-test-output>
            {{formatDateRange null null}}
          </div>
        </template>,
      );

      assert.dom('[data-test-output]').hasText('');
    });

    test('input is undefined', async function (assert) {
      await render(
        <template>
          <div data-test-output>
            {{formatDateRange undefined undefined}}
          </div>
        </template>,
      );

      assert.dom('[data-test-output]').hasText('');
    });
  },
);
