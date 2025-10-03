import {
  render,
  type TestContext as BaseTestContext,
} from '@ember/test-helpers';
import { formatTime } from 'ember-intl';
import { setLocale, setupIntl } from 'ember-intl/test-support';
import { module, test } from 'qunit';
import { formats } from 'test-app-for-ember-intl/ember-intl';
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
      const intl = this.owner.lookup('service:intl');

      intl.setFormats(formats);

      this.date = new Date('2014-01-23T18:00:44');
    });

    test('it returns a string', async function (this: TestContext, assert) {
      const self = this;

      await render<TestContext>(
        <template>
          <div data-test-output>
            {{formatTime self.date}}
          </div>
        </template>,
      );

      assert.dom('[data-test-output]').hasText('6:00 PM');
    });

    test('it returns a new value when the locale is changed', async function (this: TestContext, assert) {
      const self = this;

      await render<TestContext>(
        <template>
          <div data-test-output>
            {{formatTime self.date}}
          </div>
        </template>,
      );

      await setLocale('de-de');

      assert.dom('[data-test-output]').hasText('18:00');
    });

    test('we can format the date', async function (this: TestContext, assert) {
      const self = this;

      await render<TestContext>(
        <template>
          <div data-test-output="1">
            {{formatTime self.date format="hhmmss"}}
          </div>

          <div data-test-output="2">
            {{formatTime self.date hour="2-digit" minute="numeric"}}
          </div>
        </template>,
      );

      assert.dom('[data-test-output="1"]').hasText('6:00:44 PM');

      assert.dom('[data-test-output="2"]').hasText('06:00 PM');
    });

    test('we can specify the time zone', async function (this: TestContext, assert) {
      const self = this;

      await render<TestContext>(
        <template>
          <div data-test-output>
            {{formatTime self.date timeZone="UTC"}}
          </div>
        </template>,
      );

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
