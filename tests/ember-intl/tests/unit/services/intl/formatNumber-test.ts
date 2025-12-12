import type { TestContext as BaseTestContext } from '@ember/test-helpers';
import type { IntlService } from 'ember-intl';
import { setupIntl } from 'ember-intl/test-support';
import { module, test } from 'qunit';
import { setupTest } from 'test-app-for-ember-intl/tests/helpers';

interface TestContext extends BaseTestContext {
  intl: IntlService;
}

module('Unit | Service | intl > formatNumber()', function (hooks) {
  setupTest(hooks);
  setupIntl(hooks, 'en-us');

  hooks.beforeEach(function (this: TestContext) {
    this.intl = this.owner.lookup('service:intl');
  });

  test('it works', function (this: TestContext, assert) {
    assert.strictEqual(this.intl.formatNumber(12345678.9), '12,345,678.9');
  });

  test('options.locale', function (this: TestContext, assert) {
    assert.strictEqual(
      this.intl.formatNumber(12345678.9, {
        locale: 'de-de',
      }),
      '12.345.678,9',
    );
  });

  test('options.signDisplay', function (this: TestContext, assert) {
    assert.strictEqual(
      this.intl.formatNumber(12345678.9, {
        signDisplay: 'always',
      }),
      '+12,345,678.9',
    );
  });
});
