import { render } from '@ember/test-helpers';
import { setupIntl } from 'ember-intl/test-support';
import ExampleT from 'my-v1-app/components/example-t';
import { setupRenderingTest } from 'my-v1-app/tests/helpers';
import { module, test } from 'qunit';

module('Integration | Component | example-translation-json', function (hooks) {
  setupRenderingTest(hooks);
  setupIntl(hooks, 'en-us', {
    hello: {
      actions: {
        'clear-tasks': 'Clear tasks',
        'review-tasks': 'Review tasks',
      },
      message: 'Hi, {name}!',
    },
    title: '',
  });

  test('it renders', async function (assert) {
    await render(
      <template>
        <ExampleT @name="Zoey" />
      </template>,
    );

    assert.dom().hasText('Hi, Zoey!');
  });
});
