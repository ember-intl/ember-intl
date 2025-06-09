import { render } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';
import { setLocale, setupIntl } from 'ember-intl/test-support';
import { module, test } from 'qunit';
import { setupRenderingTest } from 'test-app-for-ember-intl/tests/helpers';

module(
  'Integration | Helper | t > input is a translation key',
  function (hooks) {
    setupRenderingTest(hooks);
    setupIntl(hooks, 'en-us');

    test('it returns a string', async function (assert) {
      await render(hbs`
        <div data-test-output>
          {{t "smoke-tests.hello.world"}}
        </div>
      `);

      assert.dom('[data-test-output]').hasText('Hello world!');
    });

    test('it returns a new value when the locale is changed', async function (assert) {
      await render(hbs`
        <div data-test-output>
          {{t "smoke-tests.hello.world"}}
        </div>
      `);

      await setLocale('de-de');

      assert.dom('[data-test-output]').hasText('Hallo Welt!');
    });

    test('we can specify the locale', async function (assert) {
      await render(hbs`
        <div data-test-output="1">
          {{t "smoke-tests.hello.world" locale="de-de"}}
        </div>

        <div data-test-output="2">
          {{t "smoke-tests.hello.world" locale="en-us"}}
        </div>

        <div data-test-output="3">
          {{t "smoke-tests.hello.world" locale="fr-fr"}}
        </div>
      `);

      assert.dom('[data-test-output="1"]').hasText('Hallo Welt!');

      assert.dom('[data-test-output="2"]').hasText('Hello world!');

      assert
        .dom('[data-test-output="3"]')
        .hasText('t:smoke-tests.hello.world:()');
    });
  },
);
