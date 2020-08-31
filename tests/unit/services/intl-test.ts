import { addListener } from '@ember/object/events';
import { registerWarnHandler } from '@ember/debug';
import { settled } from '@ember/test-helpers';
import { isHTMLSafe } from '@ember/string';
import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';
import { get } from '@ember/object';
import td from 'testdouble';
import { setupIntl, TestContext } from 'ember-intl/test-support';
import type { TOptions } from 'ember-intl/services/intl';

const LOCALE = 'en-us';

module('service:init initialization', function (hooks) {
  setupTest(hooks);

  test('it calls `setLocale` on init', function (this: TestContext, assert) {
    const setLocale = td.func();
    const Intl = this.owner.factoryFor('service:intl');

    Intl.create({ setLocale });
    assert.verify(setLocale([LOCALE]));
  });
});

module('service:intl', function (hooks) {
  setupTest(hooks);
  setupIntl(hooks, LOCALE, {}, { missingMessage: false });

  test('should return a number if the translation is a number', function (this: TestContext, assert) {
    this.intl.addTranslations(LOCALE, {
      a_number: 2,
    });

    assert.equal(this.intl.t('a_number'), 2);
  });

  test('`t` should cascade translation lookup', function (this: TestContext, assert) {
    this.intl.addTranslations(LOCALE, {
      first: 'first translation should win',
      second: 'second translation (error if used)',
    });

    assert.equal(
      this.intl.t('invalid', {
        default: ['also_invalid', 'first', 'second'],
      }),
      'first translation should win'
    );
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

    assert.equal(this.intl.t('foo.bar.baz.a'), 'a');
    assert.equal(this.intl.t('foo.bar.baz.b'), 'b');
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

    assert.equal(this.intl.t('foo.bar.baz'), 'baz!');
  });

  test('lookup() should return translation string', function (this: TestContext, assert) {
    this.intl.addTranslations(LOCALE, {
      foo: 'hello world',
    });

    assert.equal(this.intl.lookup('foo'), 'hello world');
  });

  test('should escape attributes but render translation as HTML', async function (this: TestContext, assert) {
    this.intl.addTranslations(LOCALE, {
      legacyStyle: `'<strong class="example">'Hello {name}'</strong>'`,
      modernStyle: `<strong class="example">Hello {name}</strong>`,
    });

    assert.equal(
      this.intl.t('modernStyle', { htmlSafe: true, name: '<em>Tom</em>' }).toString(),
      '<strong class="example">Hello &lt;em&gt;Tom&lt;/em&gt;</strong>'
    );
    assert.equal(
      this.intl.t('legacyStyle', { htmlSafe: true, name: '<em>Tom</em>' }).toString(),
      '<strong class="example">Hello &lt;em&gt;Tom&lt;/em&gt;</strong>'
    );
  });

  test('lookup() should return undefined for missing translations ', function (this: TestContext, assert) {
    assert.equal(this.intl.lookup('missing'), undefined);
  });

  test('`t` should display last missing translation key when using default', function (this: TestContext, assert) {
    assert.equal(
      this.intl.t('x', {
        default: ['y', 'z'],
      }),
      `Missing translation "z" for locale "en-us"`
    );
  });

  test('`t` should pass `key`, `locales`, `options` through to `missing-message` util', function (this: TestContext, assert) {
    assert.expect(3);

    this.owner.register('util:intl/missing-message', (key: string, locales: string[], options: TOptions) => {
      assert.strictEqual(key, 'should_also_not_exist');
      assert.deepEqual(locales, [LOCALE]);
      assert.deepEqual(options, {
        default: ['also.does.not.exist', 'should_also_not_exist'],
        resilient: false,
        someVariable: 'hello',
      });

      return '';
    });

    this.intl.t('does.not.exist', {
      default: ['also.does.not.exist', 'should_also_not_exist'],
      someVariable: 'hello',
    });
  });

  test('triggers notifyPropertyChange only when locale changes', function (this: TestContext, assert) {
    let count = 0;

    function increment() {
      ++count;
    }

    // eslint-disable-next-line ember/no-observers
    this.intl.addObserver('locale', this.intl, increment);
    this.intl.setLocale(['es']);
    this.intl.setLocale(['fr']);
    assert.equal(count, 2);
    assert.equal(this.intl.get('locale'), 'fr');
    this.intl.removeObserver('locale', this.intl, increment);
  });

  test('waits for translations to load', async function (this: TestContext, assert) {
    assert.expect(1);
    await settled();
    assert.equal(this.intl.t('product.title', { locale: 'en-us' }), 'Hello');
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
    assert.ok(!invokedWarn, 'Warning was not raised');
  });

  test('translations that are empty strings are valid', async function (this: TestContext, assert) {
    assert.expect(1);

    this.intl.addTranslations(LOCALE, { empty_string: '' });
    assert.equal(this.intl.t('empty_string'), '');
  });

  test('translationsFor returns translation model', async function (this: TestContext, assert) {
    this.intl.addTranslations(LOCALE, { foo: 'bar' });

    const model = this.intl.translationsFor(LOCALE);
    assert.equal(typeof model, 'object');
    assert.equal('asts' in model!, true);
    assert.equal('translations' in model!, true);
    assert.equal(typeof this.intl.translationsFor('ZZ'), 'undefined');
  });

  test('translations keys can contain periods within the key', async function (this: TestContext, assert) {
    assert.expect(2);

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

    assert.equal(this.intl.t('a.b.c.d.d.e.e'), 'Periods within a key work are now valid.');
    assert.equal(this.intl.t('b.b'), 'Root key with double period.');
  });

  test('should return safestring when htmlSafe attribute passed to `t`', async function (this: TestContext, assert) {
    assert.expect(1);

    this.intl.addTranslations(LOCALE, {
      html_safe_translation: "'<strong>'Hello &lt;em&gt;Jason&lt;/em&gt; 42,000'</strong>'",
    });

    const out = this.intl.t('html_safe_translation', {
      htmlSafe: true,
      name: '<em>Jason</em>',
      count: 42000,
    });

    assert.ok(isHTMLSafe(out));
  });

  test('should return regular string when htmlSafe is falsey', async function (this: TestContext, assert) {
    assert.expect(1);

    this.intl.addTranslations(LOCALE, {
      html_safe_translation: "'<strong>'Hello &lt;em&gt;Jason&lt;/em&gt; 42,000'</strong>'",
    });

    const out = this.intl.t('html_safe_translation', {
      htmlSafe: false,
      name: '<em>Jason</em>',
      count: 42000,
    });

    assert.ok(!isHTMLSafe(out));
  });

  test('exists returns true when key found', async function (this: TestContext, assert) {
    assert.expect(1);

    this.intl.addTranslations(LOCALE, { hello: 'world' });
    assert.equal(this.intl.exists('hello'), true);
  });

  test('exists returns false when key not found', function (this: TestContext, assert) {
    assert.expect(1);
    assert.equal(this.intl.exists('bar'), false);
  });

  test('changing the locale emits the `localeChanged` event and the new locale is available', async function (this: TestContext, assert) {
    assert.expect(1);

    const newLocale = ['de', 'en-us'];

    // @ts-expect-error https://discordapp.com/channels/480462759797063690/484421406659182603/749961012417003590
    addListener(this.intl, 'localeChanged', () => {
      assert.deepEqual(get(this.intl, 'locale') as string[], newLocale);
    });

    this.intl.setLocale(newLocale);
  });

  test('updates document `lang` attribute on locale change', async function (this: TestContext, assert) {
    assert.expect(2);

    this.intl.setLocale(['de']);
    await settled();
    assert.equal(document.documentElement.getAttribute('lang'), 'de');

    this.intl.setLocale(['es', 'fr']);
    await settled();
    assert.equal(document.documentElement.getAttribute('lang'), 'es');
  });

  test('primaryLocale returns the first locale of the currently active locales', async function (this: TestContext, assert) {
    assert.expect(2);

    assert.equal(this.intl.get('primaryLocale'), LOCALE);

    this.intl.setLocale(['de']);
    assert.equal(this.intl.get('primaryLocale'), 'de');
  });
});
