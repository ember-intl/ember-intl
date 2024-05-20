import { render, resetOnerror, setupOnerror } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';
import { setupIntl } from 'ember-intl/test-support';
import { module, test } from 'qunit';
import { setupRenderingTest } from 'test-app-for-ember-intl/tests/helpers';

module('Integration | Helper | t > input is falsy', function (hooks) {
  setupRenderingTest(hooks);
  setupIntl(hooks, 'en-us');

  test('input is false', async function (assert) {
    await render(hbs`
      <div data-test-output>
        {{! @glint-expect-error }}
        {{t false}}
      </div>
    `);

    assert.dom('[data-test-output]').hasText('t:false:()');
  });

  test('input is null', async function (assert) {
    await render(hbs`
      <div data-test-output>
        {{! @glint-expect-error }}
        {{t null}}
      </div>
    `);

    assert.dom('[data-test-output]').hasText('t:null:()');
  });

  test('input is undefined', async function (assert) {
    setupOnerror((error: Error) => {
      assert.strictEqual(error.message, '{{t}} helper requires a value.');

      assert.step('ember-intl throws an error');
    });

    await render(hbs`
      <div data-test-output>
        {{! @glint-expect-error }}
        {{t undefined}}
      </div>
    `);

    assert.verifySteps(['ember-intl throws an error']);

    resetOnerror();
  });
});
