import { render } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';
import { setupIntl } from 'ember-intl/test-support';
import { setupRenderingTest } from 'my-v1-addon/tests/helpers';
import { module, test } from 'qunit';

module('Integration | Component | example-text-assertion', function (hooks) {
  setupRenderingTest(hooks);
  setupIntl(hooks, 'en-us');

  test('it renders', async function (assert) {
    await render(hbs`<ExampleTextAssertion />`);

    assert.dom().hasText('t:hello.message:()');

    assert
      .dom()
      .includesText('t:hello.message:()', 'We see the correct message.');
  });
});
