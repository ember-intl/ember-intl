import type { TestContext as BaseTestContext } from '@ember/test-helpers';
import type { IntlService } from 'ember-intl';
import { setupIntl } from 'ember-intl/test-support';
import { module, test } from 'qunit';
import { setupTest } from 'test-app-for-ember-intl/tests/helpers';

interface TestContext extends BaseTestContext {
  intl: IntlService;
}

module('Unit | Service | intl > formatMessage()', function (hooks) {
  setupTest(hooks);
  setupIntl(hooks, 'en-us');

  hooks.beforeEach(function (this: TestContext) {
    this.intl = this.owner.lookup('service:intl');
  });

  test('it works', function (this: TestContext, assert) {
    assert.strictEqual(
      this.intl.formatMessage(
        {
          defaultMessage: 'Hello, {name}!',
          description: 'A welcome message',
          id: 'foo',
        },
        {
          name: 'Zoey',
        },
      ),
      'Hello, Zoey!',
    );
  });

  test('options.locale', function (this: TestContext, assert) {
    assert.strictEqual(
      this.intl.formatMessage(
        {
          defaultMessage: 'Hello, {name}!',
          description: 'A welcome message',
          id: 'foo',
        },
        {
          locale: 'de-de',
          name: 'Zoey',
        },
      ),
      'Hello, Zoey!',
      'options.locale should have no effect.',
    );
  });

  test('value is a string', function (this: TestContext, assert) {
    assert.strictEqual(
      this.intl.formatMessage('Hello, {name}!', { name: 'Zoey' }),
      'Hello, Zoey!',
    );
  });
});
