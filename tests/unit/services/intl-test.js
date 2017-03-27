import Ember from 'ember';
import wait from 'ember-test-helpers/wait';
import { moduleFor, test } from 'ember-qunit';

const DEFAULT_LOCALE_NAME = 'en';

moduleFor('service:intl', 'Unit | Service | intl', {
  integration: true,
  beforeEach() {
    this.inject.service('intl');
    this.intl.setLocale(DEFAULT_LOCALE_NAME);
  }
});

test('can access formatMessage without a locale set', function(assert) {
  this.intl.t('does.not.exist');
  assert.ok(true, 'Exception was not raised');
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

test('waits for translations to load', function(assert) {
  assert.expect(1);

  return wait().then(() => {
    assert.equal(this.intl.t('product.title', { locale: 'en-us' }), 'Hello world!');
  });
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

test('`t` can be passed a no options argument and no warning should be emitted', function(assert) {
  const done = assert.async();
  this.intl.setLocale(DEFAULT_LOCALE_NAME);

  let invokedWarn = false;
  const originalWarn = Ember.warn;

  Ember.warn = function() {
    invokedWarn = true;
  };

  this.intl.addTranslation(DEFAULT_LOCALE_NAME, 'foo', 'FOO').then(() => {
    this.intl.t('foo');
    assert.ok(!invokedWarn, 'Warning was not raised');
    Ember.warn = originalWarn;
    done();
  });
});

test('translations that are empty strings are valid', function(assert) {
  assert.expect(1);

  return this.intl.addTranslation(DEFAULT_LOCALE_NAME, 'empty_string', '').then(() => {
    assert.equal(this.intl.t('empty_string'), '');
  });
});

test('exists returns true when key found', function(assert) {
  assert.expect(1);

  return this.intl.addTranslation(DEFAULT_LOCALE_NAME, 'hello', 'world').then(() => {
    assert.equal(this.intl.exists('hello'), true);
  });
});

test('exists returns false when key not found', function(assert) {
  assert.expect(1);
  assert.equal(this.intl.exists('bar'), false);
});
