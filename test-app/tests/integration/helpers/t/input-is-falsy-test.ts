import { render, resetOnerror, setupOnerror } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';
import { setupIntl } from 'ember-intl/test-support';
import { module, test } from 'qunit';
import { setupRenderingTest } from 'test-app/tests/helpers';

module('Integration | Helper | t > input is falsy', function (hooks) {
  setupRenderingTest(hooks);
  setupIntl(hooks, 'en-us');

  test('input is false', async function (assert) {
    setupOnerror((error: Error) => {
      assert.strictEqual(
        error.message,
        'Assertion Failed: [ember-intl] expected translation key "false" to be of type String but received: "boolean"',
      );

      assert.step('ember-intl throws an error');
    });

    await render(hbs`
      <div data-test-output>
        {{! @glint-expect-error }}
        {{t false}}
      </div>
    `);

    assert.verifySteps(['ember-intl throws an error']);

    resetOnerror();
  });

  test('input is null', async function (assert) {
    setupOnerror((error: Error) => {
      assert.strictEqual(
        error.message,
        'Assertion Failed: [ember-intl] expected translation key "null" to be of type String but received: "object"',
      );

      assert.step('ember-intl throws an error');
    });

    await render(hbs`
      <div data-test-output>
        {{! @glint-expect-error }}
        {{t null}}
      </div>
    `);

    assert.verifySteps(['ember-intl throws an error']);

    resetOnerror();
  });

  test('input is undefined', async function (assert) {
    setupOnerror((error: Error) => {
      assert.strictEqual(error.message, '{{t}} helper requires a value.');

      assert.step('ember-intl throws an error');
    });

    await render(hbs`
      <div data-test-output>
        {{t undefined}}
      </div>
    `);

    assert.verifySteps(['ember-intl throws an error']);

    resetOnerror();
  });
});
