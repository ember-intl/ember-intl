import { setOwner } from '@ember/application';
import { inject as service } from '@ember/service';
import { htmlSafe } from '@ember/template';
import {
  render,
  type TestContext as BaseTestContext,
} from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';
import type { IntlService } from 'ember-intl';
import { setupIntl } from 'ember-intl/test-support';
import { module, test } from 'qunit';
import { setupRenderingTest, updateLocale } from 'test-app/tests/helpers';

class Royalty {
  @service declare intl: IntlService;

  get message(): string {
    switch (this.intl.primaryLocale) {
      case 'de-de': {
        return `<div class="message">Hallo, {name}! Du hast {points, number} Treuepunkte.</div>`;
      }

      case 'en-us': {
        return `<div class="message">Hello, {name}! You have {points, number} royalty points.</div>`;
      }
    }

    throw new Error('Locale must be de-de or en-us.');
  }
}

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

      // Allow injecting the intl service
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

      await updateLocale('de-de');

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
