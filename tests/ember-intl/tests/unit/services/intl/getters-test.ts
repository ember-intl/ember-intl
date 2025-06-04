import type { TestContext as BaseTestContext } from '@ember/test-helpers';
import type { IntlService } from 'ember-intl';
import { setupIntl } from 'ember-intl/test-support';
import { module, test } from 'qunit';
import { setupTest } from 'test-app-for-ember-intl/tests/helpers';

interface TestContext extends BaseTestContext {
  intl: IntlService;
}

module('Unit | Service | intl > getters', function (hooks) {
  setupTest(hooks);
  setupIntl(hooks, 'en-us');

  hooks.beforeEach(function (this: TestContext) {
    this.intl = this.owner.lookup('service:intl');
  });

  test('locales', function (this: TestContext, assert) {
    assert.deepEqual(this.intl.locales, ['de-de', 'en-us']);
  });

  test('primaryLocale', function (this: TestContext, assert) {
    assert.strictEqual(this.intl.primaryLocale, 'en-us');
  });
});
