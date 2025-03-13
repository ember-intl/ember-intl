import { visit } from '@ember/test-helpers';
import {
  selectLocale,
  setupApplicationTest,
} from 'my-v1-app-with-namespace-from-folders/tests/helpers';
import { module, test } from 'qunit';

function getGlobalLang(): string | null {
  return document.querySelector('html')!.getAttribute('lang');
}

module('Acceptance | index', function (hooks) {
  setupApplicationTest(hooks);

  module('de-de', function () {
    test('We can visit the page', async function (assert) {
      await visit('/');
      await selectLocale('de-de');

      assert.strictEqual(getGlobalLang(), 'de-de');

      assert
        .dom('[data-test-output="Title"]')
        .hasText('Willkommen bei ember-intl');

      assert
        .dom('[data-test-header="Translation with Arguments"]')
        .hasText('Übersetzung mit Argumenten');

      assert
        .dom('[data-test-output="Translation with Arguments"]')
        .hasText(
          [
            'Sonja hat 12 Fotos.',
            'Chris hat keine Fotos.',
            'Maki hat ein Foto.',
          ].join(' '),
        );

      assert.dom('[data-test-header="Components"]').hasText('Komponenten');

      assert
        .dom('[data-test-output="App"]')
        .hasText('Dies ist eine Komponente aus der App.');

      assert
        .dom('[data-test-output="V1 Addon"]')
        .hasText(
          'Missing translation "components.component-from-v1-addon.message" for locale "de-de, en-us"',
        );

      assert
        .dom('[data-test-output="V2 Addon"]')
        .hasText(
          'Missing translation "components.component-from-v2-addon.message" for locale "de-de, en-us"',
        );

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
      await visit('/');
      await selectLocale('en-us');

      assert.strictEqual(getGlobalLang(), 'en-us');

      assert.dom('[data-test-output="Title"]').hasText('Welcome to ember-intl');

      assert
        .dom('[data-test-header="Translation with Arguments"]')
        .hasText('Translation with Arguments');

      assert
        .dom('[data-test-output="Translation with Arguments"]')
        .hasText(
          [
            'Sonja has 12 photos.',
            'Chris has no photos.',
            'Maki has a photo.',
          ].join(' '),
        );

      assert.dom('[data-test-header="Components"]').hasText('Components');

      assert
        .dom('[data-test-output="App"]')
        .hasText('This is a component from the app.');

      assert
        .dom('[data-test-output="V1 Addon"]')
        .hasText(
          'Missing translation "components.component-from-v1-addon.message" for locale "en-us"',
        );

      assert
        .dom('[data-test-output="V2 Addon"]')
        .hasText(
          'Missing translation "components.component-from-v2-addon.message" for locale "en-us"',
        );

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
