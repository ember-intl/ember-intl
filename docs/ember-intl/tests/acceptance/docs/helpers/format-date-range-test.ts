import type { Registry as Services } from '@ember/service';
import {
  currentURL,
  type TestContext as BaseTestContext,
  visit,
} from '@ember/test-helpers';
import { setupApplicationTest } from 'docs-app-for-ember-intl/tests/helpers';
import { module, test } from 'qunit';

interface TestContext extends BaseTestContext {
  intl: Services['intl'];
}

module('Acceptance | docs/helpers/format-date-range', function (hooks) {
  setupApplicationTest(hooks);

  hooks.beforeEach(function (this: TestContext) {
    this.intl = this.owner.lookup('service:intl');
  });

  test('We can visit the page', async function (this: TestContext, assert) {
    await visit('/docs/helpers/format-date-range');

    assert.strictEqual(currentURL(), '/docs/helpers/format-date-range');

    assert.dom('h1').hasText('{{format-date-range}}');

    const today = new Date();
    const yesterday = new Date(today.valueOf() - 24 * 60 * 60 * 1000);

    assert
      .dom('[data-test-output="format-date-range"]')
      .hasText(`Range: ${this.intl.formatDateRange(yesterday, today)}`);

    assert.dom('[data-test-output="format-date-range, format"]').hasText(
      this.intl.formatDateRange(yesterday, today, {
        format: 'user-friendly',
      }),
    );

    assert.dom('[data-test-output="format-date-range, locale"]').hasText(
      this.intl.formatDateRange(yesterday, today, {
        locale: 'de-de',
      }),
    );
  });
});
