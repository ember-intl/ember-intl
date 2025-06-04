import type { TestContext as BaseTestContext } from '@ember/test-helpers';
import type { IntlService } from 'ember-intl';
import { setupIntl } from 'ember-intl/test-support';
import { module, test } from 'qunit';
import { setupTest } from 'test-app-for-ember-intl/tests/helpers';

interface TestContext extends BaseTestContext {
  intl: IntlService;
}

module('Unit | Service | intl > setOnMissingTranslation()', function (hooks) {
  setupTest(hooks);
  setupIntl(hooks, 'en-us');

  hooks.beforeEach(function (this: TestContext) {
    this.intl = this.owner.lookup('service:intl');
  });

  test('default implementation', function (this: TestContext, assert) {
    assert.strictEqual(
      this.intl.t('foo.bar', {
        name: 'Zoey',
      }),
      't:foo.bar:("name":"Zoey")',
    );
  });

  test('custom implementation returns a custom string', function (this: TestContext, assert) {
    this.intl.setOnMissingTranslation((key, locales) => {
      return `🐹🐹🐹 Missing: ${key} (${locales.join(',')}) 🐹🐹🐹`;
    });

    assert.strictEqual(
      this.intl.t('foo.bar', {
        name: 'Zoey',
      }),
      '🐹🐹🐹 Missing: foo.bar (en-us) 🐹🐹🐹',
    );
  });

  test('custom implementation throws an error', function (this: TestContext, assert) {
    this.intl.setOnMissingTranslation((key) => {
      throw new Error(`${key} not found!`);

      return '';
    });

    assert.throws(
      () => {
        this.intl.t('foo.bar', {
          name: 'Zoey',
        });
      },
      (error: Error) => {
        assert.step('ember-intl throws an error');

        return error.message === 'foo.bar not found!';
      },
    );

    assert.verifySteps(['ember-intl throws an error']);
  });
});
