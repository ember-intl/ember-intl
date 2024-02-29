import {
  render,
  type TestContext as BaseTestContext,
} from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';
import { setLocale, setupIntl } from 'ember-intl/test-support';
import { module, test } from 'qunit';
import { setupRenderingTest } from 'test-app-for-ember-intl/tests/helpers';

interface TestContext extends BaseTestContext {
  number: number;
}

module(
  'Integration | Helper | format-relative > input is a number',
  function (hooks) {
    setupRenderingTest(hooks);
    setupIntl(hooks, 'en-us');

    hooks.beforeEach(function (this: TestContext) {
      this.number = -1;
    });

    test('it returns a string', async function (this: TestContext, assert) {
      await render<TestContext>(hbs`
        <div data-test-output>
          {{format-relative
            this.number
            unit="year"
          }}
        </div>
      `);

      assert.dom('[data-test-output]').hasText('1 year ago');
    });

    test('it returns a new value when the locale is changed', async function (this: TestContext, assert) {
      await render<TestContext>(hbs`
        <div data-test-output>
          {{format-relative
            this.number
            unit="year"
          }}
        </div>
      `);

      await setLocale('de-de');

      assert.dom('[data-test-output]').hasText('vor 1 Jahr');
    });

    test('we can format the number', async function (this: TestContext, assert) {
      await render<TestContext>(hbs`
        <div data-test-output="1">
          {{format-relative
            this.number
            numeric="auto"
            unit="year"
          }}
        </div>

        <div data-test-output="2">
          {{format-relative
            this.number
            style="short"
            unit="year"
          }}
        </div>
      `);

      assert.dom('[data-test-output="1"]').hasText('last year');

      assert.dom('[data-test-output="2"]').hasText('1 yr. ago');
    });
  },
);
