import type { TestContext as BaseTestContext } from '@ember/test-helpers';
import type { IntlService } from 'ember-intl';
import { setupIntl } from 'ember-intl/test-support';
import { module, test } from 'qunit';
import { setupTest } from 'test-app-for-ember-intl/tests/helpers';

interface TestContext extends BaseTestContext {
  intl: IntlService;
}

module('Unit | Service | intl > formatTime()', function (hooks) {
  setupTest(hooks);
  setupIntl(hooks, 'en-us');

  hooks.beforeEach(function (this: TestContext) {
    this.intl = this.owner.lookup('service:intl');
  });

  test('it works', function (this: TestContext, assert) {
    assert.strictEqual(
      this.intl.formatTime(new Date('2014-01-23T18:00:44')),
      '6:00 PM',
    );
  });

  test('options.locale', function (this: TestContext, assert) {
    assert.strictEqual(
      this.intl.formatTime(new Date('2014-01-23T18:00:44'), {
        locale: 'de-de',
      }),
      '18:00',
    );
  });
});
