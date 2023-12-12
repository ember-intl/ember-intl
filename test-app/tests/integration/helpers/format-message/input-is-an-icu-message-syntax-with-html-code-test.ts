import { setOwner } from '@ember/application';
import { htmlSafe } from '@ember/template';
import {
  render,
  type TestContext as BaseTestContext,
} from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';
import { setLocale, setupIntl } from 'ember-intl/test-support';
import { module, test } from 'qunit';
import { Royalty, setupRenderingTest } from 'test-app/tests/helpers';

interface TestContext extends BaseTestContext {
  name: string;
  royalty: Royalty;
}

module(
  'Integration | Helper | format-message > input is an ICU message syntax with HTML code',
  function (hooks) {
    setupRenderingTest(hooks);
    setupIntl(hooks, 'en-us');

    hooks.beforeEach(function (this: TestContext) {
      this.name = 'Zoey';

      this.royalty = new Royalty();

      setOwner(this.royalty, this.owner);
    });

    test('it returns a string', async function (this: TestContext, assert) {
      await render<TestContext>(hbs`
        <div data-test-output>
          {{format-message
            this.royalty.message
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
          {{format-message
            this.royalty.message
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

    test('we can render a message that is an HTML code', async function (this: TestContext, assert) {
      await render<TestContext>(hbs`
        <div data-test-output>
          {{format-message
            this.royalty.message
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
    });

    test('we can pass an HTML code as argument', async function (this: TestContext, assert) {
      this.name = htmlSafe(
        `<span class="emphasize">Zoey</span>`,
      ) as unknown as string;

      await render<TestContext>(hbs`
        <div data-test-output>
          {{format-message
            this.royalty.message
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
