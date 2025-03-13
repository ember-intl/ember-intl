import { visit } from '@ember/test-helpers';
import {
  selectLocale,
  setupApplicationTest,
} from 'my-v1-classic-app-with-lazy-loaded-translations/tests/helpers';
import { module, test } from 'qunit';

function getGlobalLang(): string | null {
  return document.querySelector('html')!.getAttribute('lang');
}

module('Acceptance | my-v1-engine', function (hooks) {
  setupApplicationTest(hooks);

  module('de-de', function () {
    test('We can visit the page', async function (assert) {
      await visit('/my-v1-engine');
      await selectLocale('de-de');

      assert.strictEqual(getGlobalLang(), 'de-de');

      assert
        .dom('[data-test-output="Title"]')
        .hasText('Willkommen bei my-v1-engine');

      assert.dom('[data-test-header="Components"]').hasText('Komponenten');

      assert
        .dom('[data-test-output="Engine"]')
        .hasText('Dies ist eine Komponente aus einer Engine.');

      assert
        .dom('[data-test-output="Key Missing"]')
        .hasText(
          'Missing translation "routes.index.key-without-translation" for locale "de-de, en-us"',
        );

      assert
        .dom('[data-test-output="Key Overwritten"]')
        .hasText('Die Apps Übersetzungen haben Vorrang.');
    });
  });

  module('en-us', function () {
    test('We can visit the page', async function (assert) {
      await visit('/my-v1-engine');
      await selectLocale('en-us');

      assert.strictEqual(getGlobalLang(), 'en-us');

      assert
        .dom('[data-test-output="Title"]')
        .hasText('Welcome to my-v1-engine');

      assert.dom('[data-test-header="Components"]').hasText('Components');

      assert
        .dom('[data-test-output="Engine"]')
        .hasText('This is a component from an engine.');

      assert
        .dom('[data-test-output="Key Missing"]')
        .hasText(
          'Missing translation "routes.index.key-without-translation" for locale "en-us"',
        );

      assert
        .dom('[data-test-output="Key Overwritten"]')
        .hasText("The app's translations take precedence.");
    });
  });
});
