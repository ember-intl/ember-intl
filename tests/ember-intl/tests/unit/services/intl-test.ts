import Helper from '@ember/component/helper';
import { registerWarnHandler } from '@ember/debug';
import { isHTMLSafe } from '@ember/template';
import type { TestContext as BaseTestContext } from '@ember/test-helpers';
import { settled } from '@ember/test-helpers';
import type { IntlService } from 'ember-intl';
import type { TOptions } from 'ember-intl/services/intl';
import { setupIntl } from 'ember-intl/test-support';
import { setupTest } from 'ember-qunit';
import { module, test } from 'qunit';

const LOCALE = 'en-us';

interface TestContext extends BaseTestContext {
  intl: IntlService;
}

module('service:init initialization', function (hooks) {
  setupTest(hooks);

  test('it calls `setLocale` on init', async function (this: TestContext, assert) {
    const Intl = this.owner.factoryFor('service:intl');

    const recompute = () => {
      assert.step('Recompute helper');
    };

    const context = class THelper extends Helper {};

    // @ts-expect-error: Property 'onLocaleChanged' is private and only accessible within class 'IntlService'.
    Intl.create().onLocaleChanged(recompute, context);

    await settled();

    assert.verifySteps(['Recompute helper']);
  });
});

module('service:intl', function (hooks) {
  setupTest(hooks);
  setupIntl(hooks, LOCALE, {}, { missingMessage: false });

  test('should return a number if the translation is a number', function (this: TestContext, assert) {
    this.intl.addTranslations(LOCALE, {
      a_number: 2,
    });

    assert.strictEqual(this.intl.t('a_number') as unknown as number, 2);
  });

  test('should deepMerge addTranslations', function (this: TestContext, assert) {
    this.intl.addTranslations(LOCALE, {
      foo: {
        bar: {
          baz: {
            a: 'a',
          },
        },
      },
    });

    this.intl.addTranslations(LOCALE, {
      foo: {
        bar: {
          baz: {
            b: 'b',
          },
          c: {
            d: {
              e: {},
            },
          },
        },
      },
    });

    assert.strictEqual(this.intl.t('foo.bar.baz.a'), 'a');
    assert.strictEqual(this.intl.t('foo.bar.baz.b'), 'b');
  });

  test('should overwrite translations', function (this: TestContext, assert) {
    this.intl.addTranslations(LOCALE, {
      foo: {
        bar: {
          baz: 'baz',
        },
      },
    });

    this.intl.addTranslations(LOCALE, {
      foo: {
        bar: {
          baz: 'baz!',
        },
      },
    });

    assert.strictEqual(this.intl.t('foo.bar.baz'), 'baz!');
  });

  test('lookup() should return translation string', function (this: TestContext, assert) {
    this.intl.addTranslations(LOCALE, {
      foo: 'hello world',
    });

    assert.strictEqual(this.intl.lookup('foo'), 'hello world');
  });

  test('should escape attributes but render translation as HTML', async function (this: TestContext, assert) {
    this.intl.addTranslations(LOCALE, {
      legacyStyle: `'<strong class="example">'Hello {name}'</strong>'`,
      modernStyle: `<strong class="example">Hello {name}</strong>`,
    });

    assert.strictEqual(
      this.intl
        .t('modernStyle', { htmlSafe: true, name: '<em>Tom</em>' })
        .toString(),
      '<strong class="example">Hello &lt;em&gt;Tom&lt;/em&gt;</strong>',
    );
    assert.strictEqual(
      this.intl
        .t('legacyStyle', { htmlSafe: true, name: '<em>Tom</em>' })
        .toString(),
      '<strong class="example">Hello &lt;em&gt;Tom&lt;/em&gt;</strong>',
    );
  });

  test('lookup() should return undefined for missing translations ', function (this: TestContext, assert) {
    assert.strictEqual(
      this.intl.lookup('missing', undefined, { resilient: true }),
      undefined,
    );
  });

  test('`t` should display last missing translation key when using default', function (this: TestContext, assert) {
    assert.strictEqual(
      this.intl.t('x', {
        default: ['y', 'z'],
      }),
      `Missing translation "z" for locale "en-us"`,
    );
  });

  test('`t` should pass `key`, `locales`, `options` through to `missing-message` util', function (this: TestContext, assert) {
    this.owner.register(
      'util:intl/missing-message',
      (key: string, locales: string[], options: TOptions) => {
        assert.strictEqual(key, 'should_also_not_exist');
        assert.deepEqual(locales, [LOCALE]);
        assert.deepEqual(options, {
          default: ['also.does.not.exist', 'should_also_not_exist'],
          resilient: false,
          someVariable: 'hello',
        });

        return '';
      },
    );

    this.intl.t('does.not.exist', {
      default: ['also.does.not.exist', 'should_also_not_exist'],
      someVariable: 'hello',
    });
  });

  test('waits for translations to load', async function (this: TestContext, assert) {
    await settled();
    assert.strictEqual(
      this.intl.t('smoke-tests.parent.child', { locale: 'en-us' }),
      'Hello world!',
    );
  });

  test('it does not mutate t options hash', function (this: TestContext, assert) {
    this.intl.setLocale(LOCALE);
    this.intl.addTranslations(LOCALE, { foo: '' });
    const obj = { bar: 'bar' };
    this.intl.t('foo', obj);
    assert.notOk('locale' in obj);
  });

  test('`t` can be passed a null options hash', function (this: TestContext, assert) {
    this.intl.setLocale(LOCALE);
    this.intl.addTranslations(LOCALE, { foo: '' });
    this.intl.t('foo', undefined);
    assert.ok(true, 'Exception was not raised');
  });

  test('`t` can be passed a no options argument and no warning should be emitted', async function (this: TestContext, assert) {
    this.intl.setLocale(LOCALE);

    let invokedWarn = false;
    registerWarnHandler(function () {
      invokedWarn = true;
    });

    this.intl.addTranslations(LOCALE, { foo: 'FOO' });
    this.intl.t('foo');
    assert.false(invokedWarn, 'Warning was not raised');
  });

  test('translations that are empty strings are valid', function (this: TestContext, assert) {
    this.intl.addTranslations(LOCALE, { empty_string: '' });
    assert.strictEqual(this.intl.t('empty_string'), '');
  });

  test('translationsFor returns messages', async function (this: TestContext, assert) {
    this.intl.addTranslations(LOCALE, { foo: 'bar' });

    assert.strictEqual(this.intl.translationsFor(LOCALE)['foo'], 'bar');
    assert.deepEqual(this.intl.translationsFor('ZZ'), undefined);
  });

  test('translations keys can contain periods within the key', async function (this: TestContext, assert) {
    this.intl.addTranslations(LOCALE, {
      a: {
        b: {
          c: {
            'd.d': {
              'e.e': 'Periods within a key work are now valid.',
            },
          },
        },
      },
      'b.b': 'Root key with double period.',
    });

    assert.strictEqual(
      this.intl.t('a.b.c.d.d.e.e'),
      'Periods within a key work are now valid.',
    );
    assert.strictEqual(this.intl.t('b.b'), 'Root key with double period.');
  });

  test('should return safestring when htmlSafe attribute passed to `t`', async function (this: TestContext, assert) {
    this.intl.addTranslations(LOCALE, {
      html_safe_translation:
        "'<strong>'Hello &lt;em&gt;Jason&lt;/em&gt; 42,000'</strong>'",
    });

    const out = this.intl.t('html_safe_translation', {
      htmlSafe: true,
      name: '<em>Jason</em>',
      count: 42000,
    });

    assert.true(isHTMLSafe(out));
  });

  test('should return regular string when htmlSafe is falsey', async function (this: TestContext, assert) {
    this.intl.addTranslations(LOCALE, {
      html_safe_translation:
        "'<strong>'Hello &lt;em&gt;Jason&lt;/em&gt; 42,000'</strong>'",
    });

    const out = this.intl.t('html_safe_translation', {
      htmlSafe: false,
      name: '<em>Jason</em>',
      count: 42000,
    });

    assert.false(isHTMLSafe(out));
  });

  test('exists returns true when key found', async function (this: TestContext, assert) {
    this.intl.addTranslations(LOCALE, { hello: 'world' });
    assert.true(this.intl.exists('hello'));
  });

  test('exists returns false when key not found', function (this: TestContext, assert) {
    assert.false(this.intl.exists('bar'));
  });

  test('changing the locale emits the `localeChanged` event and the new locale is available', async function (this: TestContext, assert) {
    const recompute = () => {
      assert.step('Recompute helper');
    };

    const context = class THelper extends Helper {};

    // @ts-expect-error: Property 'onLocaleChanged' is private and only accessible within class 'IntlService'.
    this.intl.onLocaleChanged(recompute, context);

    this.intl.setLocale(['de', 'en-us']);

    await settled();

    assert.verifySteps(['Recompute helper']);
  });

  test('updates document `lang` attribute on locale change', async function (this: TestContext, assert) {
    this.intl.setLocale(['de']);
    await settled();
    assert.strictEqual(document.documentElement.getAttribute('lang'), 'de');

    this.intl.setLocale(['es', 'fr']);
    await settled();
    assert.strictEqual(document.documentElement.getAttribute('lang'), 'es');
  });

  test('primaryLocale returns the first locale of the currently active locales', async function (this: TestContext, assert) {
    assert.strictEqual(this.intl.get('primaryLocale'), LOCALE);

    this.intl.setLocale(['de']);
    assert.strictEqual(this.intl.get('primaryLocale'), 'de');
  });
});
