import { render } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';
import { setupIntl } from 'ember-intl/test-support';
import { module, test } from 'qunit';
import { setupRenderingTest } from 'test-app-for-ember-intl/tests/helpers';

module(
  'Integration | Helper | format-date-time-range > input is falsy',
  function (hooks) {
    setupRenderingTest(hooks);
    setupIntl(hooks, 'en-us');

    test('input is 0', async function (assert) {
      await render(hbs`
        <div data-test-output>
          {{format-date-time-range 0 0}}
        </div>
      `);

      assert
        .dom('[data-test-output]')
        .hasText(new Intl.DateTimeFormat('en-us').formatRange(0, 0));
    });

    test('input is an empty string', async function (assert) {
      await render(hbs`
        <div data-test-output>
          {{! @glint-expect-error }}
          {{format-date-time-range '' ''}}
        </div>
      `);

      assert
        .dom('[data-test-output]')
        .hasText(new Intl.DateTimeFormat('en-us').formatRange(0, 0));
    });

    test('input is null', async function (assert) {
      await render(hbs`
        <div data-test-output>
          {{format-date-time-range null null}}
        </div>
      `);

      assert.dom('[data-test-output]').hasText('');
    });

    test('input is undefined', async function (assert) {
      await render(hbs`
        <div data-test-output>
          {{format-date-time-range undefined undefined}}
        </div>
      `);

      assert.dom('[data-test-output]').hasText('');
    });
  },
);
