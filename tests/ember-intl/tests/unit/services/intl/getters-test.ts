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

  module('locales', function () {
    test('it works', function (this: TestContext, assert) {
      assert.deepEqual(this.intl.locales, ['de-de', 'en-us']);
    });
  });

  module('primaryLocale', function () {
    test('locale is a string', function (this: TestContext, assert) {
      this.intl.setLocale('en-us');

      assert.strictEqual(this.intl.primaryLocale, 'en-us');
    });

    test('locale is an array with 1 element', function (this: TestContext, assert) {
      this.intl.setLocale(['en-us']);

      assert.strictEqual(this.intl.primaryLocale, 'en-us');
    });

    test('locale is an array with more than 1 element', function (this: TestContext, assert) {
      this.intl.setLocale(['fr-ca', 'fr', 'en-us']);

      assert.strictEqual(this.intl.primaryLocale, 'fr-ca');
    });

    test('throws an error if setLocale has not been called', function (this: TestContext, assert) {
      assert.throws(
        () => this.intl.primaryLocale,
        (error: Error) => {
          return (
            error.message ===
            'Assertion Failed: intl.primaryLocale is undefined. Did you call intl.setLocale()?'
          );
        },
      );
    });
  });
});
