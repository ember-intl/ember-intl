import { render } from '@ember/test-helpers';
import { setupIntl } from 'ember-intl/test-support';
import { SelectLocale } from 'my-v2-addon';
import { selectLocale, setupRenderingTest } from 'my-v2-app/tests/helpers';
import { module, test } from 'qunit';

module('Integration | Component | select-locale', function (hooks) {
  setupRenderingTest(hooks);
  setupIntl(hooks, 'en-us');

  test('it renders', async function (assert) {
    await render(<template><SelectLocale /></template>);

    assert.dom('option[value=""]').hasText('Choose your language');

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
    await render(<template><SelectLocale /></template>);

    await selectLocale('de-de');

    assert.dom('option[value=""]').hasText('Sprache auswählen');

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
