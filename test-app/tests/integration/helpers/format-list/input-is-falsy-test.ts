import { render, resetOnerror, setupOnerror } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';
import { setupIntl } from 'ember-intl/test-support';
import { module, test } from 'qunit';
import { setupRenderingTest } from 'test-app/tests/helpers';

module('Integration | Helper | format-list > input is falsy', function (hooks) {
  setupRenderingTest(hooks);
  setupIntl(hooks, 'en-us');

  test('input is an empty array', async function (assert) {
    await render(hbs`
      <div data-test-output>
        {{format-list (array)}}
      </div>
    `);

    assert.dom('[data-test-output]').hasText('');
  });

  test('input is null', async function (assert) {
    setupOnerror(() => {
      assert.step('@formatjs/intl throws an error');
    });

    await render(hbs`
      <div data-test-output>
        {{! @glint-expect-error }}
        {{format-list null}}
      </div>
    `);

    assert.verifySteps(['@formatjs/intl throws an error']);

    resetOnerror();
  });

  test('input is undefined', async function (assert) {
    setupOnerror((error: Error) => {
      assert.strictEqual(
        error.message,
        '{{format-list}} helper requires a value.',
      );

      assert.step('ember-intl throws an error');
    });

    await render(hbs`
      <div data-test-output>
        {{format-list undefined}}
      </div>
    `);

    assert.verifySteps(['ember-intl throws an error']);

    resetOnerror();
  });
});
