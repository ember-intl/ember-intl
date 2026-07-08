import { visit } from '@ember/test-helpers';
import {
  selectLocale,
  setupApplicationTest,
} from 'my-v1-app-with-fallbacks/tests/helpers';
import { module, test } from 'qunit';

function getGlobalLang(): null | string {
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
            '{name} hat {numPhotos, plural, =0 {keine Fotos} =1 {ein Foto} other {# Fotos}}.',
            '{name} hat {numPhotos, plural, =0 {keine Fotos} =1 {ein Foto} other {# Fotos}}.',
            'hat 0 Fotos.',
          ].join(' '),
        );

      assert.dom('[data-test-header="Components"]').hasText('Components');

      assert
        .dom('[data-test-output="App"]')
        .hasText(
          '🐹🐹🐹 Missing: components.component-from-app.message (de-de, en-us) 🐹🐹🐹',
        );

      assert
        .dom('[data-test-output="V1 Addon"]')
        .hasText('Dies ist eine Komponente aus einem v1 Addon.');

      assert
        .dom('[data-test-output="V2 Addon"]')
        .hasText('Dies ist eine Komponente aus einem v2 Addon.');

      assert
        .dom('[data-test-output="Translation Missing"]')
        .hasText(
          '🐹🐹🐹 Missing: routes.index.key-without-translation (de-de, en-us) 🐹🐹🐹',
        );

      assert
        .dom('[data-test-output="Translation Overwritten"]')
        .hasText('Die Apps Übersetzungen haben Vorrang.');
    });
  });

  module('en-us', function () {
    test('We can visit the page', async function (assert) {
      await visit('/');
      await selectLocale('en-us');

      assert.strictEqual(getGlobalLang(), 'en-us');

      assert
        .dom('[data-test-output="Title"]')
        .hasText('🐹🐹🐹 Missing: routes.index.title (en-us) 🐹🐹🐹');

      assert
        .dom('[data-test-header="Translation with Arguments"]')
        .hasText('Translation with Arguments');

      assert
        .dom('[data-test-output="Translation with Arguments"]')
        .hasText(
          [
            '{name} has {numPhotos, plural, =0 {no photos} =1 {a photo} other {# photos}}.',
            '{name} has {numPhotos, plural, =0 {no photos} =1 {a photo} other {# photos}}.',
            'has 0 photos.',
          ].join(' '),
        );

      assert.dom('[data-test-header="Components"]').hasText('Components');

      assert
        .dom('[data-test-output="App"]')
        .hasText(
          '🐹🐹🐹 Missing: components.component-from-app.message (en-us) 🐹🐹🐹',
        );

      assert
        .dom('[data-test-output="V1 Addon"]')
        .hasText('This is a component from a v1 addon.');

      assert
        .dom('[data-test-output="V2 Addon"]')
        .hasText('This is a component from a v2 addon.');

      assert
        .dom('[data-test-output="Translation Missing"]')
        .hasText(
          '🐹🐹🐹 Missing: routes.index.key-without-translation (en-us) 🐹🐹🐹',
        );

      assert
        .dom('[data-test-output="Translation Overwritten"]')
        .hasText("The app's translations take precedence.");
    });
  });
});
