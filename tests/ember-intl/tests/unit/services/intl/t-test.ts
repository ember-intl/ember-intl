import type { TestContext as BaseTestContext } from '@ember/test-helpers';
import type { IntlService } from 'ember-intl';
import { setupIntl } from 'ember-intl/test-support';
import { module, test } from 'qunit';
import { setupTest } from 'test-app-for-ember-intl/tests/helpers';

interface TestContext extends BaseTestContext {
  intl: IntlService;
}

module('Unit | Service | intl > t()', function (hooks) {
  setupTest(hooks);
  setupIntl(hooks, 'en-us');

  hooks.beforeEach(function (this: TestContext) {
    this.intl = this.owner.lookup('service:intl');
  });

  test('it works', function (this: TestContext, assert) {
    assert.strictEqual(
      this.intl.t('smoke-tests.hello.message', {
        name: 'Zoey',
      }),
      'Hello, Zoey!',
    );
  });

  test('translations can be an empty string', function (this: TestContext, assert) {
    this.intl.addTranslations('en-us', {
      foo: '',
    });

    assert.strictEqual(this.intl.t('foo'), '');
  });

  test('options.htmlSafe', function (this: TestContext, assert) {
    this.intl.addTranslations('en-us', {
      legacy: `'<strong class="example">'Hello, {name}!'</strong>'`,
      modern: `<strong class="example">Hello, {name}!</strong>`,
    });

    assert.strictEqual(
      this.intl.t('legacy', {
        name: '<em>Tom</em>',
      }),
      '<strong class="example">Hello, <em>Tom</em>!</strong>',
    );

    assert.strictEqual(
      this.intl.t('modern', {
        name: '<em>Tom</em>',
      }),
      '<strong class="example">Hello, <em>Tom</em>!</strong>',
    );

    assert.strictEqual(
      this.intl
        .t('legacy', {
          htmlSafe: true,
          name: '<em>Tom</em>',
        })
        .toString(),
      '<strong class="example">Hello, &lt;em&gt;Tom&lt;/em&gt;!</strong>',
    );

    assert.strictEqual(
      this.intl
        .t('modern', {
          htmlSafe: true,
          name: '<em>Tom</em>',
        })
        .toString(),
      '<strong class="example">Hello, &lt;em&gt;Tom&lt;/em&gt;!</strong>',
    );
  });

  test('options.locale', function (this: TestContext, assert) {
    assert.strictEqual(
      this.intl.t('smoke-tests.hello.message', {
        locale: 'de-de',
        name: 'Zoey',
      }),
      'Hallo, Zoey!',
    );
  });
});
