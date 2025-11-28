import { render } from '@ember/test-helpers';
import { setupIntl } from 'ember-intl/test-support';
import {
  selectLocale,
  setupRenderingTest,
} from 'my-v1-app-with-namespace-from-folders/tests/helpers';
import { SelectLocale } from 'my-v2-addon';
import { module, test } from 'qunit';

module('Integration | Component | select-locale', function (hooks) {
  setupRenderingTest(hooks);
  setupIntl(hooks, 'en-us');

  test('it renders', async function (assert) {
    await render(<template><SelectLocale /></template>);

    assert
      .dom('option[value=""]')
      .hasText('t:components.select-locale.option.default');

    assert
      .dom('[data-test-option="de-de"]')
      .doesNotHaveAttribute('selected')
      .hasText('t:components.select-locale.option.de-de')
      .hasValue('de-de');

    assert
      .dom('[data-test-option="en-us"]')
      .hasAttribute('selected')
      .hasText('t:components.select-locale.option.en-us')
      .hasValue('en-us');
  });

  test('We can select a locale', async function (assert) {
    await render(<template><SelectLocale /></template>);

    await selectLocale('de-de');

    assert
      .dom('option[value=""]')
      .hasText('t:components.select-locale.option.default');

    assert
      .dom('[data-test-option="de-de"]')
      .hasAttribute('selected')
      .hasText('t:components.select-locale.option.de-de')
      .hasValue('de-de');

    assert
      .dom('[data-test-option="en-us"]')
      .doesNotHaveAttribute('selected')
      .hasText('t:components.select-locale.option.en-us')
      .hasValue('en-us');
  });
});
