import { currentURL, visit } from '@ember/test-helpers';
import { setupApplicationTest } from 'docs-app-for-ember-intl/tests/helpers';
import { module, test } from 'qunit';

module('Acceptance | docs/helpers/format-number', function (hooks) {
  setupApplicationTest(hooks);

  test('We can visit the page', async function (assert) {
    await visit('/docs/helpers/format-number');

    assert.strictEqual(currentURL(), '/docs/helpers/format-number');

    assert.dom('h1').hasText('{{format-number}}');

    assert.dom('[data-test-output="format-number"]').hasText('12,345');

    assert
      .dom('[data-test-output="format-number, format"]')
      .hasText('€12,345.00');

    assert.dom('[data-test-output="format-number, locale"]').hasText('12.345');
  });
});
