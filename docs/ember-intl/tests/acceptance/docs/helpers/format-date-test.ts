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

module('Acceptance | docs/helpers/format-date', function (hooks) {
  setupApplicationTest(hooks);

  hooks.beforeEach(function (this: TestContext) {
    this.intl = this.owner.lookup('service:intl');
  });

  test('We can visit the page', async function (this: TestContext, assert) {
    await visit('/docs/helpers/format-date');

    assert.strictEqual(currentURL(), '/docs/helpers/format-date');

    assert.dom('h1').hasText('{{format-date}}');

    const today = new Date();

    assert
      .dom('[data-test-output="format-date"]')
      .hasText(`Today: ${this.intl.formatDate(today)}`);

    assert.dom('[data-test-output="format-date, format"]').hasText(
      this.intl.formatDate(today, {
        format: 'user-friendly',
      }),
    );

    assert.dom('[data-test-output="format-date, locale"]').hasText(
      this.intl.formatDate(today, {
        locale: 'de-de',
      }),
    );
  });
});
