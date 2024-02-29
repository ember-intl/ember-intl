import { click, visit } from '@ember/test-helpers';
import { setupApplicationTest } from 'docs-app-for-ember-intl/tests/helpers';
import { module, test } from 'qunit';

module('Acceptance | index', function (hooks) {
  setupApplicationTest(hooks);

  test('We can visit /docs', async function (assert) {
    await visit('/');

    assert.dom('h1').hasText('Ember Intl');

    await click('main a[href="/docs"]');

    assert.dom('h1').hasText('Overview');
  });
});
