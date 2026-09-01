import { render } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';
import { setupIntl } from 'ember-intl/test-support';
import { setupRenderingTest } from 'my-v1-app/tests/helpers';
import { module, test } from 'qunit';

function t(key) {
  return `TODO: Add message for ${key}`;
}

module('Integration | Component | example-test-helper-t', function (hooks) {
  setupRenderingTest(hooks);
  setupIntl(hooks, 'en-us');

  test('it renders', async function (assert) {
    await render(hbs`
      <ExampleT @name="Zoey" />
    `);

    assert.dom().hasText(t('hello_world.message'));
  });
});
