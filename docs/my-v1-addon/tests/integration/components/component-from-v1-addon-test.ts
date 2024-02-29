import { render } from '@ember/test-helpers';
import { setupRenderingTest } from 'dummy/tests/helpers';
import { hbs } from 'ember-cli-htmlbars';
import { setupIntl } from 'ember-intl/test-support';
import { module, test } from 'qunit';

module('Integration | Component | component-from-v1-addon', function (hooks) {
  setupRenderingTest(hooks);

  module('de-de', function (nestedHooks) {
    setupIntl(nestedHooks, 'de-de');

    test('it renders', async function (assert) {
      await render(hbs`
        <ComponentFromV1Addon />
      `);

      assert
        .dom('[data-test-output="V1 Addon"]')
        .hasText('Dies ist eine Komponente aus einem v1 Addon.');
    });
  });

  module('en-us', function (nestedHooks) {
    setupIntl(nestedHooks, 'en-us');

    test('it renders', async function (assert) {
      await render(hbs`
        <ComponentFromV1Addon />
      `);

      assert
        .dom('[data-test-output="V1 Addon"]')
        .hasText('This is a component from a v1 addon.');
    });
  });
});
