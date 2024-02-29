import {
  render,
  type TestContext as BaseTestContext,
} from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';
import { setLocale, setupIntl } from 'ember-intl/test-support';
import { module, test } from 'qunit';
import { setupRenderingTest } from 'test-app-for-ember-intl/tests/helpers';

interface TestContext extends BaseTestContext {
  date: Date;
}

module(
  'Integration | Helper | format-time > input is a Date',
  function (hooks) {
    setupRenderingTest(hooks);
    setupIntl(hooks, 'en-us');

    hooks.beforeEach(function (this: TestContext) {
      this.date = new Date('2014-01-23T18:00:44');
    });

    test('it returns a string', async function (this: TestContext, assert) {
      await render<TestContext>(hbs`
        <div data-test-output>
          {{format-time this.date}}
        </div>
      `);

      assert.dom('[data-test-output]').hasText('6:00 PM');
    });

    test('it returns a new value when the locale is changed', async function (this: TestContext, assert) {
      await render<TestContext>(hbs`
        <div data-test-output>
          {{format-time this.date}}
        </div>
      `);

      await setLocale('de-de');

      assert.dom('[data-test-output]').hasText('18:00');
    });

    test('we can format the date', async function (this: TestContext, assert) {
      await render<TestContext>(hbs`
        <div data-test-output="1">
          {{format-time this.date format='hhmmss'}}
        </div>

        <div data-test-output="2">
          {{format-time
            this.date
            hour="2-digit"
            minute="numeric"
          }}
        </div>
      `);

      assert.dom('[data-test-output="1"]').hasText('6:00:44 PM');

      assert.dom('[data-test-output="2"]').hasText('06:00 PM');
    });

    test('we can specify the time zone', async function (this: TestContext, assert) {
      await render<TestContext>(hbs`
        <div data-test-output>
          {{format-time this.date timeZone='UTC'}}
        </div>
      `);

      assert.dom('[data-test-output]').hasText(
        new Intl.DateTimeFormat('en-us', {
          hour: 'numeric',
          minute: 'numeric',
          timeZone: 'UTC',
        }).format(new Date('2014-01-23T18:00:44')),
      );
    });
  },
);
