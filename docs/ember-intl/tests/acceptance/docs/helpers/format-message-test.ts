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

module('Acceptance | docs/helpers/format-message', function (hooks) {
  setupApplicationTest(hooks);

  hooks.beforeEach(function (this: TestContext) {
    this.intl = this.owner.lookup('service:intl');
  });

  test('We can visit the page', async function (this: TestContext, assert) {
    await visit('/docs/helpers/format-message');

    assert.strictEqual(currentURL(), '/docs/helpers/format-message');

    assert.dom('h1').hasText('{{format-message}}');

    const today = new Date();

    assert.dom('[data-test-output="format-message"]').hasText(
      this.intl.formatMessage(
        {
          defaultMessage: 'Maki took one photo on {timestamp, date, long}.',
          id: 'photoshoot-summary',
        },
        {
          timestamp: today,
        },
      ),
    );
  });
});
