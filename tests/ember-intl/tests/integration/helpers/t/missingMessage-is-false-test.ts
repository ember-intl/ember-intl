import { render } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';
import { setupIntl, t } from 'ember-intl/test-support';
import { module, test } from 'qunit';
import { setupRenderingTest } from 'test-app-for-ember-intl/tests/helpers';

module('Integration | Helper | t > missingMessage is false', function (hooks) {
  setupRenderingTest(hooks);
  setupIntl(
    hooks,
    'en-us',
    {
      'translation-not-found': 'Oops! {emoji}',
    },
    {
      missingMessage: false,
    },
  );

  test('input is not a valid translation key', async function (assert) {
    await render(hbs`
      <div data-test-output="1">
        {{t "key.does.not.exist"}}
      </div>

      <div data-test-output="2">
        {{t
          "key.does.not.exist"
          default="translation-not-found"
          emoji="🐹"
        }}
      </div>
    `);

    assert.dom('[data-test-output="1"]').hasText(t('key.does.not.exist'));

    assert.dom('[data-test-output="2"]').hasText('Oops! 🐹');
  });

  test('translation is not defined for the locale', async function (assert) {
    await render(hbs`
      <div data-test-output>
        {{t "smoke-tests.parent.child" locale="fr-fr"}}
      </div>
    `);

    assert
      .dom('[data-test-output]')
      .hasText(
        'Missing translation "smoke-tests.parent.child" for locale "fr-fr"',
      );
  });
});
