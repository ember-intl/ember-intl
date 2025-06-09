import { currentURL, visit } from '@ember/test-helpers';
import { setupApplicationTest } from 'docs-app-for-ember-intl/tests/helpers';
import { module, test } from 'qunit';

module('Acceptance | docs/helpers/format-relative-time', function (hooks) {
  setupApplicationTest(hooks);

  test('We can visit the page', async function (assert) {
    await visit('/docs/helpers/format-relative-time');

    assert.strictEqual(currentURL(), '/docs/helpers/format-relative-time');

    assert.dom('h1').hasText('{{format-relative-time}}');

    assert
      .dom('[data-test-output="format-relative-time"]')
      .hasText('Past: 1 second ago');

    assert
      .dom('[data-test-output="format-relative-time, format"]')
      .hasText('1s ago');

    assert
      .dom('[data-test-output="format-relative-time, locale"]')
      .hasText('vor 1 Sekunde');
  });
});
