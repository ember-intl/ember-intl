import { visit } from '@ember/test-helpers';
import { selectLocale, setupApplicationTest } from 'my-app/tests/helpers';
import { module, test } from 'qunit';

module('Acceptance | index', function (hooks) {
  setupApplicationTest(hooks);

  module('de-de', function () {
    test('We can visit the page', async function (assert) {
      await visit('/');
      await selectLocale('de-de');

      assert
        .dom('[data-test-output="Title"]')
        .hasText('Willkommen bei ember-intl');

      assert
        .dom('[data-test-output="App"]')
        .hasText('Dies ist eine Komponente aus der App.');

      assert
        .dom('[data-test-output="V1 Addon"]')
        .hasText('Dies ist eine Komponente aus einem v1 Addon.');

      assert
        .dom('[data-test-output="V2 Addon"]')
        .hasText('Dies ist eine Komponente aus einem v2 Addon.');

      assert
        .dom('[data-test-output="Key to Overwrite"]')
        .hasText('Die Apps Übersetzungen haben Vorrang.');
    });
  });

  module('en-us', function () {
    test('We can visit the page', async function (assert) {
      await visit('/');
      await selectLocale('en-us');

      assert.dom('[data-test-output="Title"]').hasText('Welcome to ember-intl');

      assert
        .dom('[data-test-output="App"]')
        .hasText('This is a component from the app.');

      assert
        .dom('[data-test-output="V1 Addon"]')
        .hasText('This is a component from a v1 addon.');

      assert
        .dom('[data-test-output="V2 Addon"]')
        .hasText('This is a component from a v2 addon.');

      assert
        .dom('[data-test-output="Key to Overwrite"]')
        .hasText("The app's translations take precedence.");
    });
  });
});
