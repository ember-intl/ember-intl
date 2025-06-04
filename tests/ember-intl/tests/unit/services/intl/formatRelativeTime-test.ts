import type { TestContext as BaseTestContext } from '@ember/test-helpers';
import type { IntlService } from 'ember-intl';
import { setupIntl } from 'ember-intl/test-support';
import { module, test } from 'qunit';
import { setupTest } from 'test-app-for-ember-intl/tests/helpers';

interface TestContext extends BaseTestContext {
  intl: IntlService;
}

module('Unit | Service | intl > formatRelativeTime()', function (hooks) {
  setupTest(hooks);
  setupIntl(hooks, 'en-us');

  hooks.beforeEach(function (this: TestContext) {
    this.intl = this.owner.lookup('service:intl');
  });

  test('it works', function (this: TestContext, assert) {
    assert.strictEqual(this.intl.formatRelativeTime(-1), '1 second ago');
  });

  test('options.locale', function (this: TestContext, assert) {
    assert.strictEqual(
      this.intl.formatRelativeTime(-1, {
        locale: 'de-de',
      }),
      'vor 1 Sekunde',
    );
  });

  test('options.unit', function (this: TestContext, assert) {
    assert.strictEqual(
      this.intl.formatRelativeTime(-1, {
        unit: 'minute',
      }),
      '1 minute ago',
    );
  });
});
