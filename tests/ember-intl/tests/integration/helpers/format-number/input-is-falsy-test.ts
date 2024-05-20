import { render } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';
import { setupIntl } from 'ember-intl/test-support';
import { module, test } from 'qunit';
import { setupRenderingTest } from 'test-app-for-ember-intl/tests/helpers';

module(
  'Integration | Helper | format-number > input is falsy',
  function (hooks) {
    setupRenderingTest(hooks);
    setupIntl(hooks, 'en-us');

    test('input is 0', async function (assert) {
      await render(hbs`
        <div data-test-output>
          {{format-number 0}}
        </div>
      `);

      assert.dom('[data-test-output]').hasText('0');
    });

    test('input is null', async function (assert) {
      await render(hbs`
        <div data-test-output>
          {{format-number null}}
        </div>
      `);

      assert.dom('[data-test-output]').hasText('');
    });

    test('input is undefined', async function (assert) {
      await render(hbs`
        <div data-test-output>
          {{format-number undefined}}
        </div>
      `);

      assert.dom('[data-test-output]').hasText('');
    });
  },
);
