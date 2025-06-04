import type { TestContext as BaseTestContext } from '@ember/test-helpers';
import type { IntlService } from 'ember-intl';
import { setupIntl } from 'ember-intl/test-support';
import { module, test } from 'qunit';
import { setupTest } from 'test-app-for-ember-intl/tests/helpers';

interface TestContext extends BaseTestContext {
  intl: IntlService;
}

module('Unit | Service | intl > exists()', function (hooks) {
  setupTest(hooks);
  setupIntl(hooks, 'en-us');

  hooks.beforeEach(function (this: TestContext) {
    this.intl = this.owner.lookup('service:intl');
  });

  module('locale is missing', function () {
    test('returns true, if and only if, the key exists for an active locale (1)', function (this: TestContext, assert) {
      this.intl.addTranslations('de-de', {});

      this.intl.addTranslations('en-us', {
        foo2: 'Hello!',
      });

      this.intl.setLocale(['de-de', 'en-us']);

      assert.false(this.intl.exists('foo1'));
      assert.true(this.intl.exists('foo2'));
    });

    test('returns true, if and only if, the key exists for an active locale (2)', function (this: TestContext, assert) {
      this.intl.addTranslations('de-de', {
        foo1: 'Hallo',
      });

      this.intl.addTranslations('en-us', {
        foo2: 'Hello!',
      });

      this.intl.setLocale(['de-de', 'en-us']);

      assert.true(this.intl.exists('foo1'));
      assert.true(this.intl.exists('foo2'));
    });

    test('returns true, if and only if, the key exists for an active locale (3)', function (this: TestContext, assert) {
      this.intl.addTranslations('de-de', {
        foo1: {
          bar: {
            baz: 'Hallo!',
          },
        },
      });

      this.intl.addTranslations('en-us', {
        foo2: {
          bar: {
            baz: 'Hello!',
          },
        },
      });

      this.intl.setLocale(['de-de', 'en-us']);

      assert.false(this.intl.exists('foo1'));
      assert.false(this.intl.exists('foo2'));

      assert.false(this.intl.exists('foo1.bar'));
      assert.false(this.intl.exists('foo2.bar'));

      assert.true(this.intl.exists('foo1.bar.baz'));
      assert.true(this.intl.exists('foo2.bar.baz'));
    });
  });

  module('locale is specified', function () {
    test('returns true, if and only if, the key exists for the specified locale (1)', function (this: TestContext, assert) {
      this.intl.addTranslations('de-de', {});

      this.intl.addTranslations('en-us', {
        foo2: 'Hello!',
      });

      this.intl.setLocale(['en-us']);

      assert.false(this.intl.exists('foo1', 'de-de'));
      assert.false(this.intl.exists('foo2', 'de-de'));

      assert.false(this.intl.exists('foo1', 'en-us'));
      assert.true(this.intl.exists('foo2', 'en-us'));

      assert.false(this.intl.exists('foo1', 'fr-fr'));
      assert.false(this.intl.exists('foo2', 'fr-fr'));
    });

    test('returns true, if and only if, the key exists for the specified locale (2)', function (this: TestContext, assert) {
      this.intl.addTranslations('de-de', {
        foo1: 'Hallo',
      });

      this.intl.addTranslations('en-us', {
        foo2: 'Hello!',
      });

      this.intl.setLocale(['en-us']);

      assert.true(this.intl.exists('foo1', 'de-de'));
      assert.false(this.intl.exists('foo2', 'de-de'));

      assert.false(this.intl.exists('foo1', 'en-us'));
      assert.true(this.intl.exists('foo2', 'en-us'));

      assert.false(this.intl.exists('foo1', 'fr-fr'));
      assert.false(this.intl.exists('foo2', 'fr-fr'));
    });

    test('returns true, if and only if, the key exists for the specified locale (3)', function (this: TestContext, assert) {
      this.intl.addTranslations('de-de', {
        foo1: {
          bar: {
            baz: 'Hallo!',
          },
        },
      });

      this.intl.addTranslations('en-us', {
        foo2: {
          bar: {
            baz: 'Hello!',
          },
        },
      });

      this.intl.setLocale(['en-us']);

      assert.true(this.intl.exists('foo1.bar.baz', 'de-de'));
      assert.false(this.intl.exists('foo2.bar.baz', 'de-de'));

      assert.false(this.intl.exists('foo1.bar.baz', 'en-us'));
      assert.true(this.intl.exists('foo2.bar.baz', 'en-us'));

      assert.false(this.intl.exists('foo1.bar.baz', 'fr-fr'));
      assert.false(this.intl.exists('foo2.bar.baz', 'fr-fr'));
    });
  });
});
