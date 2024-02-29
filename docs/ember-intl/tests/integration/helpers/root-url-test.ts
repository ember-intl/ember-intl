import { render } from '@ember/test-helpers';
import { setupRenderingTest } from 'docs-app-for-ember-intl/tests/helpers';
import { hbs } from 'ember-cli-htmlbars';
import { module, test } from 'qunit';

module('Integration | Helper | root-url', function (hooks) {
  setupRenderingTest(hooks);

  test('it accepts urls with a leading slash', async function (assert) {
    await render(hbs`{{root-url "/images/numberformat.png"}}`);

    assert.dom().hasText('/images/numberformat.png');
  });

  test('it accepts urls witout a leading slash', async function (assert) {
    await render(hbs`{{root-url "images/numberformat.png"}}`);

    assert.dom().hasText('/images/numberformat.png');
  });
});
