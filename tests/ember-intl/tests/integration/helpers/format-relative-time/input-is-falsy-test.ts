import { render } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';
import { setupIntl } from 'ember-intl/test-support';
import { module, test } from 'qunit';
import { setupRenderingTest } from 'test-app-for-ember-intl/tests/helpers';

module(
  'Integration | Helper | format-relative-time > input is falsy',
  function (hooks) {
    setupRenderingTest(hooks);
    setupIntl(hooks, 'en-us');

    test('input is 0', async function (assert) {
      await render(hbs`
        <div data-test-output>
          {{format-relative-time 0 unit="year"}}
        </div>
      `);

      assert.dom('[data-test-output]').hasText('in 0 years');
    });

    test('input is null', async function (assert) {
      await render(hbs`
        <div data-test-output>
          {{format-relative-time null unit="year"}}
        </div>
      `);

      assert.dom('[data-test-output]').hasText('');
    });

    test('input is undefined', async function (assert) {
      await render(hbs`
        <div data-test-output>
          {{format-relative-time undefined unit="year"}}
        </div>
      `);

      assert.dom('[data-test-output]').hasText('');
    });
  },
);
