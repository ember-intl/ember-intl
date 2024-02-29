import { htmlSafe } from '@ember/template';
import {
  render,
  type TestContext as BaseTestContext,
} from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';
import { setLocale, setupIntl } from 'ember-intl/test-support';
import { module, test } from 'qunit';
import { setupRenderingTest } from 'test-app-for-ember-intl/tests/helpers';

interface TestContext extends BaseTestContext {
  name: string;
}

module(
  'Integration | Helper | t > translation has HTML code',
  function (hooks) {
    setupRenderingTest(hooks);
    setupIntl(hooks, 'de-de', {
      royalty: {
        message:
          '<div class="message">Hallo, {name}! Du hast {points, number} Treuepunkte.</div>',
      },
    });
    setupIntl(hooks, 'en-us', {
      royalty: {
        message:
          '<div class="message">Hello, {name}! You have {points, number} royalty points.</div>',
      },
    });

    hooks.beforeEach(function (this: TestContext) {
      this.name = 'Zoey';
    });

    test('it returns a string', async function (this: TestContext, assert) {
      await render<TestContext>(hbs`
        <div data-test-output>
          {{t
            "royalty.message"
            name=this.name
            points=31415
          }}
        </div>
      `);

      assert
        .dom('[data-test-output]')
        .hasText(
          '<div class="message">Hello, Zoey! You have 31,415 royalty points.</div>',
        );

      assert.dom('[data-test-output] > div').doesNotExist();
    });

    test('it returns a new value when the locale is changed', async function (this: TestContext, assert) {
      await render<TestContext>(hbs`
        <div data-test-output>
          {{t
            "royalty.message"
            name=this.name
            points=31415
          }}
        </div>
      `);

      await setLocale('de-de');

      assert
        .dom('[data-test-output]')
        .hasText(
          '<div class="message">Hallo, Zoey! Du hast 31.415 Treuepunkte.</div>',
        );

      assert.dom('[data-test-output] > div').doesNotExist();
    });

    test('we can pass an HTML code as argument', async function (this: TestContext, assert) {
      this.name = htmlSafe(
        `<span class="emphasize">Zoey</span>`,
      ) as unknown as string;

      await render<TestContext>(hbs`
        <div data-test-output>
          {{t
            "royalty.message"
            htmlSafe=true
            name=this.name
            points=31415
          }}
        </div>
      `);

      assert
        .dom('[data-test-output]')
        .hasText('Hello, Zoey! You have 31,415 royalty points.');

      assert.dom('[data-test-output] > div').hasClass('message');

      assert.dom('[data-test-output] > div > span').hasClass('emphasize');
    });
  },
);
