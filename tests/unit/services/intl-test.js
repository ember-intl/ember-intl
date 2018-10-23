import { registerWarnHandler } from '@ember/debug';
import { isHTMLSafe } from '@ember/string';
import { settled } from '@ember/test-helpers';
import { setupTest } from 'ember-qunit';
import { module, test } from 'qunit';
import { get } from '@ember/object';
import { addListener } from '@ember/object/events';

const LOCALE = 'en';

module('service:intl', function(hooks) {
  setupTest(hooks);

  hooks.beforeEach(function() {
    this.intl = this.owner.lookup('service:intl');
    this.intl.set('locale', LOCALE);
  });

  test('can access formatMessage without a locale set', function(assert) {
    this.intl.t('does.not.exist');
    assert.ok(true, 'Exception was not raised');
  });

  test('should return a number if the translation is a number', function(assert) {
    this.intl.addTranslations(LOCALE, {
      a_number: 2
    });

    assert.equal(this.intl.t('a_number'), 2);
  });

  test('`t` should cascade translation lookup', function(assert) {
    this.intl.addTranslations(LOCALE, {
      should_exist: 'I do exist!',
      should_also_exist: 'I do also exist!'
    });

    assert.equal(
      this.intl.t('does.not.exist', {
        default: ['also.does.not.exist', 'should_exist', 'should_also_exist']
      }),
      'I do exist!'
    );
  });

  test('should deepMerge addTranslations', function(assert) {
    this.intl.addTranslations(LOCALE, {
      foo: {
        bar: {
          baz: {
            a: 'a'
          }
        }
      }
    });

    this.intl.addTranslations(LOCALE, {
      foo: {
        bar: {
          baz: {
            b: 'b'
          },
          c: {
            d: {
              e: {}
            }
          }
        }
      }
    });

    assert.equal(this.intl.t('foo.bar.baz.a'), 'a');
    assert.equal(this.intl.t('foo.bar.baz.b'), 'b');
  });

  test('should overwrite translations', function(assert) {
    this.intl.addTranslations(LOCALE, {
      foo: {
        bar: {
          baz: 'baz'
        }
      }
    });

    this.intl.addTranslations(LOCALE, {
      foo: {
        bar: {
          baz: 'baz!'
        }
      }
    });

    assert.equal(this.intl.t('foo.bar.baz'), 'baz!');
  });

  test('`t` should display last missing translation key when using default', function(assert) {
    assert.equal(
      this.intl.t('does.not.exist', {
        default: ['also.does.not.exist', 'should_also_exist']
      }),
      `Missing translation "should_also_exist" for locale "en"`
    );
  });

  test('`t` should pass `key`, `locales`, `options` through to `missing-message` util', function(assert) {
    assert.expect(3);

    this.owner.register('util:intl/missing-message', (key, locales, options) => {
      assert.strictEqual(key, 'should_also_not_exist');
      assert.deepEqual(locales, [LOCALE]);
      assert.deepEqual(options, {
        default: ['also.does.not.exist', 'should_also_not_exist'],
        resilient: false,
        someVariable: 'hello'
      });

      return '';
    });

    this.intl.t('does.not.exist', {
      default: ['also.does.not.exist', 'should_also_not_exist'],
      someVariable: 'hello'
    });
  });

  test('triggers notifyPropertyChange only when locale changes', function(assert) {
    let count = 0;

    function increment() {
      ++count;
    }

    this.intl.addObserver('locale', this.intl, increment);
    this.intl.set('locale', 'es');
    this.intl.set('locale', 'fr');
    assert.equal(count, 2);
    assert.equal(this.intl.get('locale'), 'fr');
    this.intl.removeObserver('locale', this.intl, increment);
  });

  test('waits for translations to load', async function(assert) {
    assert.expect(1);
    await settled();
    assert.equal(this.intl.t('product.title', { locale: 'en-us' }), 'Hello world!');
  });

  test('it does not mutate t options hash', function(assert) {
    this.intl.set('locale', LOCALE);
    const obj = { bar: 'bar' };
    this.intl.t('foo', obj);
    assert.ok(typeof obj.locale === 'undefined');
  });

  test('`t` can be passed a null options hash', function(assert) {
    this.intl.set('locale', LOCALE);
    this.intl.t('foo', undefined);
    assert.ok(true, 'Exception was not raised');
  });

  test('`t` can be passed a no options argument and no warning should be emitted', async function(assert) {
    this.intl.set('locale', LOCALE);

    let invokedWarn = false;
    registerWarnHandler(function() {
      invokedWarn = true;
    });

    this.intl.addTranslations(LOCALE, { foo: 'FOO' });
    this.intl.t('foo');
    assert.ok(!invokedWarn, 'Warning was not raised');
  });

  test('translations that are empty strings are valid', async function(assert) {
    assert.expect(1);

    this.intl.addTranslations(LOCALE, { empty_string: '' });
    assert.equal(this.intl.t('empty_string'), '');
  });

  test('translations keys can contain periods within the key', async function(assert) {
    assert.expect(2);

    this.intl.addTranslations(LOCALE, {
      a: {
        b: {
          c: {
            'd.d': {
              'e.e': 'Periods within a key work are now valid.'
            }
          }
        }
      },
      'b.b': 'Root key with double period.'
    });

    assert.equal(this.intl.t('a.b.c.d.d.e.e'), 'Periods within a key work are now valid.');
    assert.equal(this.intl.t('b.b'), 'Root key with double period.');
  });

  test('should return safestring when htmlSafe attribute passed to `t`', async function(assert) {
    assert.expect(1);

    this.intl.addTranslations(LOCALE, {
      html_safe_translation: '<strong>Hello &lt;em&gt;Jason&lt;/em&gt; 42,000</strong>'
    });

    const out = this.intl.t('html_safe_translation', {
      htmlSafe: true,
      name: '<em>Jason</em>',
      count: 42000
    });

    assert.ok(isHTMLSafe(out));
  });

  test('should return regular string when htmlSafe is falsey', async function(assert) {
    assert.expect(1);

    this.intl.addTranslations(LOCALE, {
      html_safe_translation: '<strong>Hello &lt;em&gt;Jason&lt;/em&gt; 42,000</strong>'
    });

    const out = this.intl.t('html_safe_translation', {
      htmlSafe: false,
      name: '<em>Jason</em>',
      count: 42000
    });

    assert.ok(!isHTMLSafe(out));
  });

  test('exists returns true when key found', async function(assert) {
    assert.expect(1);

    this.intl.addTranslations(LOCALE, { hello: 'world' });
    assert.equal(this.intl.exists('hello'), true);
  });

  test('exists returns false when key not found', function(assert) {
    assert.expect(1);
    assert.equal(this.intl.exists('bar'), false);
  });

  test('changing the locale emits the `localeChanged` event and the new locale is available', async function(assert) {
    const newLocale = ['de', 'en-us'];

    addListener(this.intl, 'localeChanged', () => {
      assert.deepEqual(get(this.intl, 'locale'), newLocale);
    });

    this.intl.setLocale(newLocale);
  });
});
