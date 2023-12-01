import { render, resetOnerror, setupOnerror } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';
import { setupIntl } from 'ember-intl/test-support';
import { module, test } from 'qunit';
import { setupRenderingTest } from 'test-app/tests/helpers';

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
          {{! @glint-expect-error }}
          {{format-number null}}
        </div>
      `);

      assert.dom('[data-test-output]').hasText('0');
    });

    test('input is undefined', async function (assert) {
      setupOnerror((error: Error) => {
        assert.strictEqual(
          error.message,
          '{{format-number}} helper requires a value.',
        );

        assert.step('ember-intl throws an error');
      });

      await render(hbs`
        <div data-test-output>
          {{format-number undefined}}
        </div>
      `);

      assert.verifySteps(['ember-intl throws an error']);

      resetOnerror();
    });
  },
);
