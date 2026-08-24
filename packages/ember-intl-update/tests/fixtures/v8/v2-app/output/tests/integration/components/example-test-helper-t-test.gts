import { render } from '@ember/test-helpers';
import { setupIntl } from 'ember-intl/test-support';
import ExampleT from 'my-v1-app/components/example-t';
import { setupRenderingTest } from 'my-v1-app/tests/helpers';
import { module, test } from 'qunit';

module('Integration | Component | example-test-helper-t', function (hooks) {
  setupRenderingTest(hooks);
  setupIntl(hooks, 'en-us');

  test('it renders', async function (assert) {
    await render(<template><ExampleT @name="Zoey" /></template>);

    assert.dom().hasText(t('hello_world.message'));
  });
});
