import { render, resetOnerror, setupOnerror } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';
import { setupIntl } from 'ember-intl/test-support';
import { module, test } from 'qunit';
import { setupRenderingTest } from 'test-app/tests/helpers';

module(
  'Integration | Helper | format-date > input is not well-defined',
  function (hooks) {
    setupRenderingTest(hooks);
    setupIntl(hooks, 'en-us');

    test('input is not an integer', async function (assert) {
      await render(hbs`
        <div data-test-output>
          {{format-date 1.1}}
        </div>
      `);

      assert.dom('[data-test-output]').hasText('1/1/1970');
    });

    test('input is not a date string', async function (assert) {
      setupOnerror(() => {
        assert.step('@formatjs/intl throws an error');
      });

      await render(hbs`
        <div data-test-output>
          {{format-date 'hello world'}}
        </div>
      `);

      assert.verifySteps(['@formatjs/intl throws an error']);

      resetOnerror();
    });
  },
);
