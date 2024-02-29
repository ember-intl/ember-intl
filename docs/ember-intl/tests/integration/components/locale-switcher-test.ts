import { findAll, render } from '@ember/test-helpers';
import { setupRenderingTest } from 'docs-app-for-ember-intl/tests/helpers';
import { hbs } from 'ember-cli-htmlbars';
import { setupIntl } from 'ember-intl/test-support';
import { module, test } from 'qunit';

module('Integration | Component | locale-switcher', function (hooks) {
  setupRenderingTest(hooks);
  setupIntl(hooks);

  test('it renders', async function (assert) {
    await render(hbs`
      <LocaleSwitcher />
    `);

    const buttons = findAll('[data-test-button]');

    assert.strictEqual(buttons.length, 4);

    assert.dom(buttons[0]).hasText('en-us');

    assert.dom(buttons[buttons.length - 1]).hasText('fr-fr');
  });
});
