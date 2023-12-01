import { render } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';
import { setupIntl } from 'ember-intl/test-support';
import { module, test } from 'qunit';
import { setupRenderingTest, updateLocale } from 'test-app/tests/helpers';

module(
  'Integration | Helper | t > input is a translation key',
  function (hooks) {
    setupRenderingTest(hooks);
    setupIntl(hooks, 'en-us');

    test('it returns a string', async function (assert) {
      await render(hbs`
        <div data-test-output>
          {{t "smoke-tests.parent.child"}}
        </div>
      `);

      assert.dom('[data-test-output]').hasText('Hello world!');
    });

    test('it returns a new value when the locale is changed', async function (assert) {
      await render(hbs`
        <div data-test-output>
          {{t "smoke-tests.parent.child"}}
        </div>
      `);

      await updateLocale('de-de');

      assert.dom('[data-test-output]').hasText('Hallo Welt!');
    });
  },
);
