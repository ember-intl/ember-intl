import { render } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';
import { setupIntl } from 'ember-intl/test-support';
import { setupRenderingTest } from 'ember-qunit';
import { module, test } from 'qunit';

module('Integration | Helper | format-list', function (hooks) {
  setupRenderingTest(hooks);
  setupIntl(hooks);

  test('it should return a formatted string from a list', async function (assert) {
    await render(hbs`
      {{format-list (array "foo" "bar")}}
    `);

    assert.dom().hasText('foo and bar');
  });
});
