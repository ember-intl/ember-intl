import { render } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';
import { setupIntl } from 'ember-intl/test-support';
import { module, test } from 'qunit';
import { setupRenderingTest } from 'test-app-for-ember-intl/tests/helpers';

module(
  'Integration | Helper | format-list > input is not well-defined',
  function (hooks) {
    setupRenderingTest(hooks);
    setupIntl(hooks, 'en-us');

    test('input is an array of numbers', async function (assert) {
      await render(hbs`
        <div data-test-output>
          {{! @glint-expect-error }}
          {{format-list (array 1 2 3)}}
        </div>
      `);

      assert.dom('[data-test-output]').hasText('1, 2, and 3');
    });
  },
);
