import { render, resetOnerror, setupOnerror } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';
import { setupIntl } from 'ember-intl/test-support';
import { module, test } from 'qunit';
import { setupRenderingTest } from 'test-app-for-ember-intl/tests/helpers';

module(
  'Integration | Helper | format-message > input is falsy',
  function (hooks) {
    setupRenderingTest(hooks);
    setupIntl(hooks, 'en-us');

    test('input is null and allowEmpty is true', async function (assert) {
      await render(hbs`
        <div data-test-output>
          {{format-message null}}
        </div>
      `);

      assert.dom('[data-test-output]').hasText('');
    });

    test('input is undefined and allowEmpty is true', async function (assert) {
      setupOnerror((error: Error) => {
        assert.strictEqual(
          error.message,
          '{{format-message}} helper requires a value.',
        );

        assert.step('ember-intl throws an error');
      });

      await render(hbs`
        <div data-test-output>
          {{format-message undefined}}
        </div>
      `);

      assert.verifySteps(['ember-intl throws an error']);

      resetOnerror();
    });
  },
);
