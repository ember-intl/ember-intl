import { setOwner } from '@ember/application';
import {
  render,
  type TestContext as BaseTestContext,
} from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';
import { setLocale, setupIntl } from 'ember-intl/test-support';
import { module, test } from 'qunit';
import { Currency, setupRenderingTest } from 'test-app/tests/helpers';

interface TestContext extends BaseTestContext {
  currency: Currency;
  number: number;
}

module(
  'Integration | Helper | format-number > input is a currency',
  function (hooks) {
    setupRenderingTest(hooks);
    setupIntl(hooks, 'en-us');

    hooks.beforeEach(function (this: TestContext) {
      this.currency = new Currency();

      setOwner(this.currency, this.owner);

      this.number = 12345678.9;
    });

    test('it returns a string', async function (this: TestContext, assert) {
      await render<TestContext>(hbs`
        <div data-test-output>
          {{format-number
            this.number
            currency=this.currency.unit
            style="currency"
          }}
        </div>
      `);

      assert.dom('[data-test-output]').hasText('$12,345,678.90');
    });

    test('it returns a new value when the locale is changed', async function (this: TestContext, assert) {
      await render<TestContext>(hbs`
        <div data-test-output>
          {{format-number
            this.number
            currency=this.currency.unit
            style="currency"
          }}
        </div>
      `);

      await setLocale('de-de');

      assert.dom('[data-test-output]').hasText(/12\.345\.678,90\s€/);
    });

    test('we can use hash options to override the global options', async function (this: TestContext, assert) {
      await render<TestContext>(hbs`
        {{! Globally, number.currency.minimumFractionDigits is 2. }}
        <div data-test-output="1">
          {{format-number
            this.number
            currency=this.currency.unit
            format="currency"
            style="currency"
          }}
        </div>

        <div data-test-output="2">
          {{format-number
            this.number
            currency=this.currency.unit
            format="currency"
            style="currency"
            minimumFractionDigits=0
          }}
        </div>
      `);

      assert.dom('[data-test-output="1"]').hasText('$12,345,678.90');

      assert.dom('[data-test-output="2"]').hasText('$12,345,678.9');
    });
  },
);
