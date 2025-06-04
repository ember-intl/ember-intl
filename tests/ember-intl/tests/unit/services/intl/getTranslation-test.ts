import type { TestContext as BaseTestContext } from '@ember/test-helpers';
import type { IntlService } from 'ember-intl';
import { setupIntl } from 'ember-intl/test-support';
import { module, test } from 'qunit';
import { setupTest } from 'test-app-for-ember-intl/tests/helpers';

interface TestContext extends BaseTestContext {
  intl: IntlService;
}

module('Unit | Service | intl > getTranslation()', function (hooks) {
  setupTest(hooks);
  setupIntl(hooks, 'en-us');

  hooks.beforeEach(function (this: TestContext) {
    this.intl = this.owner.lookup('service:intl');
  });

  test('returns the translation message', function (this: TestContext, assert) {
    assert.strictEqual(
      this.intl.getTranslation('smoke-tests.hello.message', 'de-de'),
      'Hallo, {name}!',
    );

    assert.strictEqual(
      this.intl.getTranslation('smoke-tests.hello.message', 'en-us'),
      'Hello, {name}!',
    );
  });

  test('returns undefined if the locale has no translations', function (this: TestContext, assert) {
    assert.strictEqual(
      this.intl.getTranslation('smoke-tests.hello.message', 'fr-fr'),
      undefined,
    );
  });

  test("returns undefined if the key doesn't exist for the given locale", function (this: TestContext, assert) {
    assert.strictEqual(
      this.intl.getTranslation('smoke-tests.hello', 'de-de'),
      undefined,
    );

    assert.strictEqual(
      this.intl.getTranslation('smoke-tests.hello', 'en-us'),
      undefined,
    );
  });
});
