import { click, currentURL, visit } from '@ember/test-helpers';
import { setupApplicationTest } from 'docs-app-for-ember-intl/tests/helpers';
import { module, test } from 'qunit';

module('Acceptance | index', function (hooks) {
  setupApplicationTest(hooks);

  test('We can visit the page', async function (assert) {
    await visit('/');

    assert.strictEqual(currentURL(), '/');

    assert.dom('h1').hasText('Ember Intl');
  });

  test('We can visit /docs', async function (assert) {
    await visit('/');
    await click('[data-test-link="Read the docs"]');

    assert.strictEqual(currentURL(), '/docs');

    assert.dom('h1').hasText('Overview');
  });
});
