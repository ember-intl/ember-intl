import type { TestContext as BaseTestContext } from '@ember/test-helpers';
import type { IntlService } from 'ember-intl';
import { setupIntl } from 'ember-intl/test-support';
import { module, test } from 'qunit';
import { setupTest } from 'test-app-for-ember-intl/tests/helpers';

interface TestContext extends BaseTestContext {
  intl: IntlService;
}

module('Unit | Service | intl > setOnFormatjsError()', function (hooks) {
  setupTest(hooks);
  setupIntl(hooks, 'en-us');

  hooks.beforeEach(function (this: TestContext) {
    this.intl = this.owner.lookup('service:intl');
  });

  test('default implementation', function (this: TestContext, assert) {
    assert.throws(
      () => {
        this.intl.t('smoke-tests.hello.message', {
          locale: 'de-de',
        });
      },
      (error: Error & { code: string }) => {
        assert.step('@formatjs/intl throws an error');

        return error.code === 'FORMAT_ERROR';
      },
    );

    assert.verifySteps(['@formatjs/intl throws an error']);
  });

  test('custom implementation ignores an error', function (this: TestContext, assert) {
    this.intl.setOnFormatjsError((error) => {
      switch (error.code) {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-enum-comparison
        case 'FORMAT_ERROR': {
          // Do nothing
          break;
        }

        default: {
          throw error;
        }
      }
    });

    assert.strictEqual(
      this.intl.t('smoke-tests.hello.message', {
        locale: 'de-de',
      }),
      'Hallo, {name}!',
    );
  });
});
