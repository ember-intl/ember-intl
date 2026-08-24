import { render } from '@ember/test-helpers';
import { formatRelativeTime } from 'ember-intl';
import { setupIntl } from 'ember-intl/test-support';
import { setupRenderingTest } from 'my-v1-addon/tests/helpers';
import { module, test } from 'qunit';

module('Integration | Component | example-format-relative', function (hooks) {
  setupRenderingTest(hooks);
  setupIntl(hooks, 'en-us');

  test('it renders', async function (assert) {
    await render(<template>{{formatRelativeTime -1}}</template>);

    assert.ok(true);
  });
});
