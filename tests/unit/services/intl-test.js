import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';
import { isHTMLSafe } from '@ember/string';
import { settled } from '@ember/test-helpers';
import { registerWarnHandler } from '@ember/debug';

const DEFAULT_LOCALE_NAME = 'en';

module('service:intl', function(hooks) {
  setupTest(hooks);
  hooks.beforeEach(function() {
    this.intl = this.owner.lookup('service:intl');
    this.intl.setLocale(DEFAULT_LOCALE_NAME);
  });

  test('can access formatMessage without a locale set', function(assert) {
    this.intl.t('does.not.exist');
    assert.ok(true, 'Exception was not raised');
  });

  test('`t` can be passed options fallback', function(assert) {
    assert.equal(this.intl.t('does.not.exist', { fallback: 'It does not exists' }), 'It does not exists');
  });

  test('triggers notifyPropertyChange only when locale changes', function(assert) {
    let count = 0;

    function increment() {
      ++count;
    }

    this.intl.addObserver('locale', this.intl, increment);
    this.intl.setLocale('es');
    this.intl.setLocale('es');
    this.intl.setLocale(['es']);
    this.intl.setLocale('fr');
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
    this.intl.setLocale(DEFAULT_LOCALE_NAME);
    const obj = { bar: 'bar' };
    this.intl.t('foo', obj);
    assert.ok(typeof obj.locale === 'undefined');
  });

  test('`t` can be passed a null options hash', function(assert) {
    this.intl.setLocale(DEFAULT_LOCALE_NAME);
    this.intl.t('foo', undefined);
    assert.ok(true, 'Exception was not raised');
  });

  test('`t` can be passed a no options argument and no warning should be emitted', async function(assert) {
    this.intl.setLocale(DEFAULT_LOCALE_NAME);

    let invokedWarn = false;
    registerWarnHandler(function() {
      invokedWarn = true;
    });

    this.intl.addTranslation(DEFAULT_LOCALE_NAME, 'foo', 'FOO');
    this.intl.t('foo');
    assert.ok(!invokedWarn, 'Warning was not raised');
  });

  test('translations that are empty strings are valid', async function(assert) {
    assert.expect(1);

    this.intl.addTranslation(DEFAULT_LOCALE_NAME, 'empty_string', '');
    assert.equal(this.intl.t('empty_string'), '');
  });

  test('should return safestring when htmlSafe attribute passed to `t`', async function(assert) {
    assert.expect(1);

    this.intl.addTranslation(
      DEFAULT_LOCALE_NAME,
      'html_safe_translation',
      '<strong>Hello &lt;em&gt;Jason&lt;/em&gt; 42,000</strong>'
    );
    const out = this.intl.t('html_safe_translation', {
      htmlSafe: true,
      name: '<em>Jason</em>',
      count: 42000
    });

    assert.ok(isHTMLSafe(out));
  });

  test('should return regular string when htmlSafe is falsey', async function(assert) {
    assert.expect(1);

    this.intl.addTranslation(
      DEFAULT_LOCALE_NAME,
      'html_safe_translation',
      '<strong>Hello &lt;em&gt;Jason&lt;/em&gt; 42,000</strong>'
    );
    const out = this.intl.t('html_safe_translation', {
      htmlSafe: false,
      name: '<em>Jason</em>',
      count: 42000
    });

    assert.ok(!isHTMLSafe(out));
  });

  test('exists returns true when key found', async function(assert) {
    assert.expect(1);

    this.intl.addTranslation(DEFAULT_LOCALE_NAME, 'hello', 'world');
    assert.equal(this.intl.exists('hello'), true);
  });

  test('exists returns false when key not found', function(assert) {
    assert.expect(1);
    assert.equal(this.intl.exists('bar'), false);
  });
});
