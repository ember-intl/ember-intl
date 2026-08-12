import type { TestContext as BaseTestContext } from '@ember/test-helpers';
import type { IntlService } from 'ember-intl';
import { module, test } from 'qunit';
import { setupTest } from 'test-app-for-ember-intl/tests/helpers';

interface TestContext extends BaseTestContext {
  intl: IntlService;
}

module('Unit | Service | intl > getters', function (hooks) {
  setupTest(hooks);

  hooks.beforeEach(function (this: TestContext) {
    this.intl = this.owner.lookup('service:intl');
  });

  test('locales', function (this: TestContext, assert) {
    assert.deepEqual(this.intl.locales, ['de-de', 'en-us']);
  });

  test('primaryLocale', function (this: TestContext, assert) {
    this.intl.setLocale('en-us');

    assert.strictEqual(this.intl.primaryLocale, 'en-us');
  });

  test('primaryLocale returns first locale of fallback chain', function (this: TestContext, assert) {
    this.intl.setLocale(['fr-ca', 'fr', 'en-us']);

    assert.strictEqual(this.intl.primaryLocale, 'fr-ca');
  });

  test('primaryLocale throws when setLocale has not been called', function (this: TestContext, assert) {
    assert.throws(
      () => this.intl.primaryLocale,
      /ember-intl: locale is missing\. Make sure to call `intl\.setLocale\(\.\.\.\)` first\./,
    );
  });
});
