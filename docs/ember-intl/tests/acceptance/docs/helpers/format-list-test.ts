import { currentURL, visit } from '@ember/test-helpers';
import { setupApplicationTest } from 'docs-app-for-ember-intl/tests/helpers';
import { module, test } from 'qunit';

module('Acceptance | docs/helpers/format-list', function (hooks) {
  setupApplicationTest(hooks);

  test('We can visit the page', async function (assert) {
    await visit('/docs/helpers/format-list');

    assert.strictEqual(currentURL(), '/docs/helpers/format-list');

    assert.dom('h1').hasText('{{format-list}}');

    assert.dom('[data-test-output="format-list"]').hasText('A, B, and C');

    assert
      .dom('[data-test-output="format-list, locale"]')
      .hasText('A, B und C');
  });
});
