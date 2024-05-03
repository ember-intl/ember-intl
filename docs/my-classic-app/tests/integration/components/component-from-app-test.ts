import { render } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';
import { setupIntl } from 'ember-intl/test-support';
import { setupRenderingTest } from 'my-app/tests/helpers';
import { module, test } from 'qunit';

module('Integration | Component | component-from-app', function (hooks) {
  setupRenderingTest(hooks);

  module('de-de', function (nestedHooks) {
    setupIntl(nestedHooks, 'de-de');

    test('it renders', async function (assert) {
      await render(hbs`
        <ComponentFromApp />
      `);

      assert
        .dom('[data-test-output="App"]')
        .hasText('Dies ist eine Komponente aus der App.');
    });
  });

  module('en-us', function (nestedHooks) {
    setupIntl(nestedHooks, 'en-us');

    test('it renders', async function (assert) {
      await render(hbs`
        <ComponentFromApp />
      `);

      assert
        .dom('[data-test-output="App"]')
        .hasText('This is a component from the app.');
    });
  });
});
