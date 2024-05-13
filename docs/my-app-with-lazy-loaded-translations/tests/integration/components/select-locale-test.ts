import { render } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';
import { setupIntl } from 'ember-intl/test-support';
import {
  selectLocale,
  setupRenderingTest,
} from 'my-app-with-lazy-loaded-translations/tests/helpers';
import { module, test } from 'qunit';

module('Integration | Component | select-locale', function (hooks) {
  setupRenderingTest(hooks);
  setupIntl(hooks, 'en-us');

  test('it renders', async function (assert) {
    await render(hbs`
      <SelectLocale />
    `);

    assert
      .dom('option[value=""]')
      .hasText('t:components.select-locale.default-option:()');

    assert
      .dom('[data-test-option="de-de"]')
      .doesNotHaveAttribute('selected')
      .hasText('Deutsch')
      .hasValue('de-de');

    assert
      .dom('[data-test-option="en-us"]')
      .hasAttribute('selected')
      .hasText('English')
      .hasValue('en-us');
  });

  test('We can select a locale', async function (assert) {
    await render(hbs`
      <SelectLocale />
    `);

    await selectLocale('de-de');

    assert
      .dom('option[value=""]')
      .hasText('t:components.select-locale.default-option:()');

    assert
      .dom('[data-test-option="de-de"]')
      .hasAttribute('selected')
      .hasText('Deutsch')
      .hasValue('de-de');

    assert
      .dom('[data-test-option="en-us"]')
      .doesNotHaveAttribute('selected')
      .hasText('English')
      .hasValue('en-us');
  });
});
