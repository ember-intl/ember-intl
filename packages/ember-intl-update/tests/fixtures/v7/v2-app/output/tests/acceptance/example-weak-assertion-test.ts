import { visit } from '@ember/test-helpers';
import { selectLocale, setupApplicationTest } from 'my-v2-app/tests/helpers';
import { module, test } from 'qunit';

module('Acceptance | index', function (hooks) {
  setupApplicationTest(hooks);

  module('de-de', function () {
    test('We can visit the page', async function (assert) {
      await visit('/');
      await selectLocale('de-de');

      assert
        .dom()
        .hasText(
          't:hello.message',
          'We see the correct message.',
        );
    });
  });

  module('en-us', function () {
    test('We can visit the page', async function (assert) {
      await visit('/');
      await selectLocale('en-us');

      assert.dom().hasText('t:hello.message');
    });
  });
});
