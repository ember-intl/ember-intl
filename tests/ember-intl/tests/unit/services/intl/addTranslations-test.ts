import type { TestContext as BaseTestContext } from '@ember/test-helpers';
import type { IntlService } from 'ember-intl';
import { setupIntl } from 'ember-intl/test-support';
import { module, test } from 'qunit';
import { setupTest } from 'test-app-for-ember-intl/tests/helpers';

interface TestContext extends BaseTestContext {
  intl: IntlService;
}

module('Unit | Service | intl > addTranslations()', function (hooks) {
  setupTest(hooks);
  setupIntl(hooks, 'en-us');

  hooks.beforeEach(function (this: TestContext) {
    this.intl = this.owner.lookup('service:intl');
  });

  test('translations must be a string', function (this: TestContext, assert) {
    this.intl.addTranslations('en-us', {
      foo: 'Hello!',
      // @ts-expect-error: Incorrect type
      bar: 2,
    });

    assert.strictEqual(this.intl.t('foo'), 'Hello!');

    assert.throws(
      () => {
        this.intl.t('bar');
      },
      (error: Error) => {
        assert.step('@formatjs/intl throws an error');

        return error.message.includes('@formatjs/intl');
      },
    );

    assert.verifySteps(['@formatjs/intl throws an error']);
  });

  test('keys can include a period', function (this: TestContext, assert) {
    this.intl.addTranslations('en-us', {
      foo: {
        'bar.baz': 'Hello!',
      },
      'foo2.bar.baz': 'Hi!',
      'foo3.bar': {
        baz: 'Bye!',
      },
    });

    assert.strictEqual(this.intl.t('foo.bar.baz'), 'Hello!');
    assert.strictEqual(this.intl.t('foo2.bar.baz'), 'Hi!');
    assert.strictEqual(this.intl.t('foo3.bar.baz'), 'Bye!');
  });

  test('can be called multiple times', function (this: TestContext, assert) {
    this.intl.addTranslations('en-us', {
      foo: {
        bar: {
          baz: 'Hello!',
        },
      },
    });

    this.intl.addTranslations('en-us', {
      foo: {
        bar: {
          baz: 'Hi!',
          quux: 'Bye!',
        },
        bar2: {},
      },
    });

    assert.strictEqual(this.intl.t('foo.bar.baz'), 'Hi!');
    assert.strictEqual(this.intl.t('foo.bar.quux'), 'Bye!');
    assert.strictEqual(this.intl.t('foo.bar2'), 't:foo.bar2:()');
  });
});
