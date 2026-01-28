import {
  settled,
  type TestContext as BaseTestContext,
} from '@ember/test-helpers';
import type { IntlService } from 'ember-intl';
import { setupIntl } from 'ember-intl/test-support';
import { module, test } from 'qunit';
import { setupTest } from 'test-app-for-ember-intl/tests/helpers';

interface TestContext extends BaseTestContext {
  intl: IntlService;
}

module('Unit | Service | intl > setLocale()', function (hooks) {
  setupTest(hooks);
  setupIntl(hooks, 'en-us');

  hooks.beforeEach(function (this: TestContext) {
    this.intl = this.owner.lookup('service:intl');
  });

  test("updates the document's lang attribute", async function (this: TestContext, assert) {
    function getLang(): string {
      return document.documentElement.getAttribute('lang')!;
    }

    assert.strictEqual(getLang(), 'en-us');

    this.intl.setLocale(['de-de', 'en-us']);

    await settled();

    assert.strictEqual(getLang(), 'de-de');

    this.intl.setLocale(['fr-fr', 'de-de', 'en-us']);

    await settled();

    assert.strictEqual(getLang(), 'fr-fr');
  });
});
