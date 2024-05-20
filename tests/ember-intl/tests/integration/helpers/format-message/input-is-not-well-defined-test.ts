import { render, resetOnerror, setupOnerror } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';
import { setupIntl } from 'ember-intl/test-support';
import { module, test } from 'qunit';
import { setupRenderingTest } from 'test-app-for-ember-intl/tests/helpers';

module(
  'Integration | Helper | format-message > input is not well-defined',
  function (hooks) {
    setupRenderingTest(hooks);
    setupIntl(hooks, 'en-us');

    test('input is an empty string', async function (assert) {
      setupOnerror(() => {
        assert.step('@formatjs/intl throws an error');
      });

      await render(hbs`
        <div data-test-output>
          {{format-message ""}}
        </div>
      `);

      assert.verifySteps(['@formatjs/intl throws an error']);

      resetOnerror();
    });
  },
);
