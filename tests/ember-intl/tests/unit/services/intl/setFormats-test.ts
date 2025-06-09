import type { TestContext as BaseTestContext } from '@ember/test-helpers';
import type { IntlService } from 'ember-intl';
import { setupIntl } from 'ember-intl/test-support';
import { module, test } from 'qunit';
import { setupTest } from 'test-app-for-ember-intl/tests/helpers';

interface TestContext extends BaseTestContext {
  intl: IntlService;
}

module('Unit | Service | intl > setFormats()', function (hooks) {
  setupTest(hooks);
  setupIntl(hooks, 'en-us');

  hooks.beforeEach(function (this: TestContext) {
    this.intl = this.owner.lookup('service:intl');
  });

  test('formats must be defined prior to usage', function (this: TestContext, assert) {
    assert.throws(
      () => {
        this.intl.formatNumber(12345, {
          format: 'my-format',
        });
      },
      (error: Error) => {
        assert.step('@formatjs/intl throws an error');

        return error.message.includes('@formatjs/intl');
      },
    );

    assert.verifySteps(['@formatjs/intl throws an error']);
  });

  test('updates formats', function (this: TestContext, assert) {
    assert.strictEqual(this.intl.formatNumber(12345), '12,345');

    this.intl.setFormats({
      'format-number': {
        'my-format': {
          currency: 'EUR',
          style: 'currency',
        },
      },
    });

    assert.strictEqual(
      this.intl.formatNumber(12345, {
        format: 'my-format',
      }),
      '€12,345.00',
    );
  });
});
