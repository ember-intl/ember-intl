import Helper from '@ember/component/helper';
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

module('Unit | Service | intl', function (hooks) {
  setupTest(hooks);
  setupIntl(hooks, 'en-us');

  hooks.beforeEach(function (this: TestContext) {
    this.intl = this.owner.lookup('service:intl') as IntlService;
  });

  module('getters', function () {
    test('locales', function (this: TestContext, assert) {
      assert.deepEqual(this.intl.locales, ['de-de', 'en-us']);
    });

    test('primaryLocale', function (this: TestContext, assert) {
      assert.strictEqual(this.intl.primaryLocale, 'en-us');
    });
  });

  module('addTranslations()', function () {
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

  module('exists()', function () {
    test('returns true if the key exists for the given locale', async function (this: TestContext, assert) {
      this.intl.addTranslations('en-us', {
        foo: 'Hello!',
      });

      assert.true(this.intl.exists('foo'));
    });

    test("returns false if the key doesn't exist for the given locale", async function (this: TestContext, assert) {
      this.intl.addTranslations('en-us', {
        foo: 'Hello!',
      });

      assert.false(this.intl.exists('foo', 'de-de'));
      assert.false(this.intl.exists('bar'));
      assert.false(this.intl.exists('bar', 'de-de'));
    });
  });

  module('formatDate()', function () {
    test('it works', function (this: TestContext, assert) {
      assert.strictEqual(
        this.intl.formatDate(new Date('2014-01-23T18:00:44')),
        '1/23/2014',
      );
    });

    test('options.locale', function (this: TestContext, assert) {
      assert.strictEqual(
        this.intl.formatDate(new Date('2014-01-23T18:00:44'), {
          locale: 'de-de',
        }),
        '23.1.2014',
      );
    });
  });

  module('formatList()', function () {
    test('it works', function (this: TestContext, assert) {
      assert.strictEqual(
        this.intl.formatList(['apples', 'bananas', 'oranges']),
        'apples, bananas, and oranges',
      );
    });

    test('options.locale', function (this: TestContext, assert) {
      assert.strictEqual(
        this.intl.formatList(['apples', 'bananas', 'oranges'], {
          locale: 'de-de',
        }),
        'apples, bananas und oranges',
      );
    });
  });

  module('formatMessage()', function () {
    test('it works', function (this: TestContext, assert) {
      assert.strictEqual(
        this.intl.formatMessage(
          {
            defaultMessage: 'Hello, {name}!',
            description: 'A welcome message',
            id: 'foo',
          },
          {
            name: 'Zoey',
          },
        ),
        'Hello, Zoey!',
      );
    });

    test('options.locale', function (this: TestContext, assert) {
      assert.strictEqual(
        this.intl.formatMessage(
          {
            defaultMessage: 'Hello, {name}!',
            description: 'A welcome message',
            id: 'foo',
          },
          {
            locale: 'de-de',
            name: 'Zoey',
          },
        ),
        'Hello, Zoey!',
        'options.locale should have no effect.',
      );
    });

    test('value is a string', function (this: TestContext, assert) {
      assert.strictEqual(
        this.intl.formatMessage('Hello, {name}!', { name: 'Zoey' }),
        'Hello, Zoey!',
      );
    });
  });

  module('formatNumber()', function () {
    test('it works', function (this: TestContext, assert) {
      assert.strictEqual(this.intl.formatNumber(12345678.9), '12,345,678.9');
    });

    test('options.locale', function (this: TestContext, assert) {
      assert.strictEqual(
        this.intl.formatNumber(12345678.9, {
          locale: 'de-de',
        }),
        '12.345.678,9',
      );
    });
  });

  module('formatRelative()', function () {
    test('it works', function (this: TestContext, assert) {
      assert.strictEqual(this.intl.formatRelative(-1), '1 second ago');
    });

    test('options.locale', function (this: TestContext, assert) {
      assert.strictEqual(
        this.intl.formatRelative(-1, {
          locale: 'de-de',
        }),
        'vor 1 Sekunde',
      );
    });

    test('options.unit', function (this: TestContext, assert) {
      assert.strictEqual(
        this.intl.formatRelative(-1, {
          unit: 'minute',
        }),
        '1 minute ago',
      );
    });
  });

  module('formatTime()', function () {
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

  module('getTranslation()', function () {
    test('returns the translation message', function (this: TestContext, assert) {
      assert.strictEqual(
        this.intl.getTranslation('smoke-tests.hello.message', 'de-de'),
        'Hallo, {name}!',
      );

      assert.strictEqual(
        this.intl.getTranslation('smoke-tests.hello.message', 'en-us'),
        'Hello, {name}!',
      );
    });

    test('returns undefined if the locale has no translations', function (this: TestContext, assert) {
      assert.strictEqual(
        this.intl.getTranslation('smoke-tests.hello.message', 'fr-fr'),
        undefined,
      );
    });

    test("returns undefined if the key doesn't exist for the given locale", function (this: TestContext, assert) {
      assert.strictEqual(
        this.intl.getTranslation('smoke-tests.hello', 'de-de'),
        undefined,
      );

      assert.strictEqual(
        this.intl.getTranslation('smoke-tests.hello', 'en-us'),
        undefined,
      );
    });
  });

  module('setLocale()', function () {
    test('triggers the localeChanged event', async function (this: TestContext, assert) {
      const callback = () => {
        assert.step('Callback');
      };

      const context = class THelper extends Helper {};

      // @ts-expect-error: Property 'onLocaleChanged' is private and only accessible within class 'IntlService'.
      this.intl.onLocaleChanged(callback, context);

      assert.verifySteps([]);

      this.intl.setLocale(['de-de', 'en-us']);

      await settled();

      assert.verifySteps(['Callback']);

      this.intl.setLocale(['fr-fr', 'de-de', 'en-us']);

      await settled();

      assert.verifySteps(['Callback']);
    });

    test("updates the document's lang attribute", async function (this: TestContext, assert) {
      function getLang() {
        return document.documentElement.getAttribute('lang');
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

  module('setOnFormatjsError()', function () {
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

  module('setOnMissingTranslation()', function () {
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

  module('t()', function () {
    test('it works', async function (this: TestContext, assert) {
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
});
