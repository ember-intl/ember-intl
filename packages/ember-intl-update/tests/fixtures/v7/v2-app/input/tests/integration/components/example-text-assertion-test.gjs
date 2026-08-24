import { render } from '@ember/test-helpers';
import { setupIntl } from 'ember-intl/test-support';
import ExampleTextAssertion from 'my-v2-app/components/example-text-assertion';
import { setupRenderingTest } from 'my-v2-app/tests/helpers';
import { module, test } from 'qunit';

module('Integration | Component | example-text-assertion', function (hooks) {
  setupRenderingTest(hooks);
  setupIntl(hooks, 'en-us');

  test('it renders', async function (assert) {
    await render(
      <template>
        <ExampleTextAssertion />
      </template>,
    );

    assert.dom().hasText('t:hello.message:()');

    assert
      .dom()
      .includesText('t:hello.message:()', 'We see the correct message.');
  });
});
