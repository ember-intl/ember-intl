import type { TestContext as BaseTestContext } from '@ember/test-helpers';
import type { IntlService } from 'ember-intl';
import { setupIntl } from 'ember-intl/test-support';
import { module, test } from 'qunit';
import { setupTest } from 'test-app-for-ember-intl/tests/helpers';

interface TestContext extends BaseTestContext {
  intl: IntlService;
}

module('Unit | Service | intl > formatDisplayName', function (hooks) {
  setupTest(hooks);
  setupIntl(hooks, 'en-us');

  hooks.beforeEach(function (this: TestContext) {
    this.intl = this.owner.lookup('service:intl');
  });

  test('it works', function (this: TestContext, assert) {
    assert.strictEqual(
      this.intl.formatDisplayName('de-de', {
        type: 'language',
      }),
      'German (Germany)',
    );
  });

  test('options.locale', function (this: TestContext, assert) {
    assert.strictEqual(
      this.intl.formatDisplayName('de-de', {
        locale: 'de-de',
        type: 'language',
      }),
      'Deutsch (Deutschland)',
    );
  });

  test('throws an error if display name cannot be found', function (this: TestContext, assert) {
    assert.throws(
      () => {
        this.intl.formatDisplayName('a', {
          fallback: 'none',
          type: 'language',
        });
      },
      (error: Error & { code: string }) => {
        assert.step('@formatjs/intl throws an error');

        return error.code === 'FORMAT_ERROR';
      },
    );

    assert.verifySteps(['@formatjs/intl throws an error']);
  });
});
