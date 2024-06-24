import { visit } from '@ember/test-helpers';
import { setupApplicationTest } from 'dummy/tests/helpers';
import { setLocale } from 'ember-intl/test-support';
import { module, test } from 'qunit';

function getGlobalLang(): string | null {
  return document.querySelector('html')!.getAttribute('lang');
}

module('Acceptance | index', function (hooks) {
  setupApplicationTest(hooks);

  module('de-de', function () {
    test('We can visit the page', async function (assert) {
      await visit('/');
      await setLocale('de-de');

      assert.strictEqual(getGlobalLang(), 'de-de');

      assert.dom('[data-test-output="Title"]').hasText('Willkommen!');

      assert
        .dom('[data-test-output="Description"]')
        .hasText(
          'Das hier ist ein v1 Addon, um ember-intl zu testen. Vielleicht wolltest du die App in docs/my-app ausführen?',
        );
    });
  });

  module('en-us', function () {
    test('We can visit the page', async function (assert) {
      await visit('/');
      await setLocale('en-us');

      assert.strictEqual(getGlobalLang(), 'en-us');

      assert.dom('[data-test-output="Title"]').hasText('Welcome!');

      assert
        .dom('[data-test-output="Description"]')
        .hasText(
          'This is a test v1 addon for ember-intl. Did you want to run the app in docs/my-app instead?',
        );
    });
  });
});
