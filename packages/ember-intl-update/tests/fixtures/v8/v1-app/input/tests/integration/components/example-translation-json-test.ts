import { render } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';
import { setupIntl } from 'ember-intl/test-support';
import { setupRenderingTest } from 'my-v1-app/tests/helpers';
import { module, test } from 'qunit';

module('Integration | Component | example-translation-json', function (hooks) {
  setupRenderingTest(hooks);
  setupIntl(hooks, 'en-us', {
    'hello world': {
      message: 'Hi, {name}!',
    },
  });

  test('it renders', async function (assert) {
    await render(hbs`
      <ExampleT @name="Zoey" />
    `);

    assert.dom().hasText('Hi, Zoey!');
  });
});
