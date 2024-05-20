import { render } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';
import { setupIntl, t } from 'ember-intl/test-support';
import { module, test } from 'qunit';
import { setupRenderingTest } from 'test-app-for-ember-intl/tests/helpers';

module(
  'Integration | Helper | t > input is not well-defined',
  function (hooks) {
    setupRenderingTest(hooks);
    setupIntl(hooks, 'en-us');

    test('input is not a valid translation key', async function (assert) {
      await render(hbs`
        <div data-test-output="1">
          {{t "key.does.not.exist"}}
        </div>
      `);

      assert.dom('[data-test-output="1"]').hasText(t('key.does.not.exist'));
    });

    test('translation is not defined for the locale', async function (assert) {
      await render(hbs`
        <div data-test-output>
          {{t "smoke-tests.parent.child" locale="fr-fr"}}
        </div>
      `);

      assert
        .dom('[data-test-output]')
        .hasText(t('smoke-tests.parent.child', { locale: 'fr-fr' }));
    });
  },
);
