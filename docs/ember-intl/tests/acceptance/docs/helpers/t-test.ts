import { currentURL, visit } from '@ember/test-helpers';
import { setupApplicationTest } from 'docs-app-for-ember-intl/tests/helpers';
import { module, test } from 'qunit';

module('Acceptance | docs/helpers/t', function (hooks) {
  setupApplicationTest(hooks);

  test('We can visit the page', async function (assert) {
    await visit('/docs/helpers/t');

    assert.strictEqual(currentURL(), '/docs/helpers/t');

    assert.dom('h1').hasText('{{t}}');

    assert.dom('[data-test-output="t"]').hasText('Hello!');

    assert.dom('[data-test-output="t, data"]').hasText('You have 3 photos.');

    assert.dom('[data-test-output="t, locale"]').hasText('Du hast 3 Fotos.');
  });
});
