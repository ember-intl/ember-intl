import hbs from 'htmlbars-inline-precompile';
import { module, test, skip } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import formatRelativehelper from 'ember-intl/helpers/format-relative';

module('format-relative', function(hooks) {
  setupRenderingTest(hooks);

  hooks.beforeEach(function() {
    this.intl = this.owner.lookup('service:intl');
    this.intl.setLocale('en-us');
    this.owner.register('formats:main', { relative: { hours: { units: 'hour', style: 'numeric' } } });
    this.owner.registerOptionsForType('formats', { singleton: true, instantiate: false });
  });

  test('exists', function(assert) {
    assert.expect(1);
    assert.ok(formatRelativehelper);
  });

  test('invoke the formatRelative directly', function(assert) {
    assert.expect(1);
    assert.equal(this.intl.formatRelative(new Date()), 'now');
  });

  skip('should throw if called with out a value', function(assert) {
    assert.expect(1);

    expectError(() => render(hbs`{{format-relative}}`), ex => assert.ok(ex));
  });

  test('can specify a `value` and `now` on the options hash', async function(assert) {
    assert.expect(1);
    await render(hbs`{{format-relative 2000 now=0}}`);
    assert.equal(this.element.textContent, 'in 2 seconds');
  });

  test('can specify a `interval` to trigger recompute', async function(assert) {
    assert.expect(2);
    const done = assert.async();

    this.set('date', new Date());
    await render(hbs`{{format-relative date interval=1000}}`);
    assert.equal(this.element.textContent, 'now');

    setTimeout(() => {
      assert.equal(this.element.textContent, '1 second ago');
      done();
    }, 1001);
  });

  test('should return relative time in hours, not best fit', async function(assert) {
    assert.expect(1);
    this.set('date', 1000 * 60 * 60 * 24 * 2);
    // two days
    await render(hbs`{{format-relative date now=0 format="hours"}}`);
    assert.equal(this.element.textContent, 'in 48 hours');
  });

  test('should return now', async function(assert) {
    assert.expect(1);
    this.set('date', new Date().getTime());
    await render(hbs`{{format-relative date}}`);
    assert.equal(this.element.textContent, 'now');
  });

  test('should display the fallback if called with no value', async function(assert) {
    assert.expect(1);
    await render(hbs`{{format-relative fallback="fallback value"}}`);
    assert.equal(this.element.textContent, 'fallback value');
  });

  test('should display the fallback if called with an undefined value', async function(assert) {
    assert.expect(1);
    await render(hbs`{{format-relative undefined fallback="fallback value"}}`);
    assert.equal(this.element.textContent, 'fallback value');
  });

  test('should return now when an array is supplied as the locale', async function(assert) {
    assert.expect(1);
    this.set('date', new Date().getTime());

    // This adds tests to validate locale resolution
    // here we are providing the first two locales as invalid locales (unregistered)
    // so it should resolve to the locale IntlRelativeFormat has data for, de-de
    this.set('locale', ['foo', 'bar', 'de-de']);
    await render(hbs`{{format-relative date locale=locale}}`);
    assert.equal(this.element.textContent, 'jetzt');
  });
});
