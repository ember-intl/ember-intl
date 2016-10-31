import hbs from 'htmlbars-inline-precompile';
import { moduleForComponent, test } from 'ember-qunit';
import formatRelativehelper from 'ember-intl/helpers/format-relative';
import { instanceInitializer } from '../../../instance-initializers/ember-intl';

let service, registry;

moduleForComponent('format-relative', {
  integration: true,
  beforeEach() {
    instanceInitializer(this);

    registry = this.registry || this.container;
    service = this.container.lookup('service:intl');
    service.setLocale('en-us');

    registry.register('formats:main', {
      relative: {
        hours: {
          units: 'hour',
          style: 'numeric'
        }
      }
    });

    registry.optionsForType('formats', {
      singleton: true,
      instantiate: false
    });
  }
});

test('exists', function(assert) {
  assert.expect(1);
  assert.ok(formatRelativehelper);
});

test('invoke the formatRelative directly', function(assert) {
  assert.expect(1);
  assert.equal(service.formatRelative(new Date()), 'now');
});

test('should throw if called with out a value', function(assert) {
  assert.expect(1);

  try {
    this.render(hbs`{{format-relative}}`);
  } catch(ex) {
    assert.ok(ex, 'raised error when not value is passed to format-relative');
  }
});

test('can specify a `value` and `now` on the options hash', function(assert) {
  assert.expect(1);
  this.render(hbs`{{format-relative 2000 now=0}}`);
  assert.equal(this.$().text(), 'in 2 seconds');
});

test('can specify a `interval` to trigger recompute', function(assert) {
  assert.expect(2);
  const done = assert.async();

  this.set('date', new Date());
  this.render(hbs`{{format-relative date interval=1000}}`);
  assert.equal(this.$().text(), 'now');

  setTimeout(() => {
    assert.equal(this.$().text(), '1 second ago');
    done();
  }, 1001);
});

test('should return relative time in hours, not best fit', function(assert) {
  assert.expect(1);
  this.set('date', (1000 * 60 * 60 * 24) * 2); // two days
  this.render(hbs`{{format-relative date now=0 format="hours"}}`);
  assert.equal(this.$().text(), 'in 48 hours');
});

test('should return now', function(assert) {
  assert.expect(1);
  this.set('date', new Date().getTime());
  this.render(hbs`{{format-relative date}}`);
  assert.equal(this.$().text(), 'now');
});

test('should display the fallback if called with no value', function(assert) {
  assert.expect(1);
  this.render(hbs`{{format-relative fallback="fallback value"}}`);
  assert.equal(this.$().text(), 'fallback value');
});

test('should display the fallback if called with an undefined value', function(assert) {
  assert.expect(1);
  this.render(hbs`{{format-relative undefined fallback="fallback value"}}`);
  assert.equal(this.$().text(), 'fallback value');
});

test('should return now when an array is supplied as the locale', function(assert) {
  assert.expect(1);
  this.set('date', new Date().getTime());

  // This adds tests to validate locale resolution
  // here we are providing the first two locales as invalid locales (unregistered)
  // so it should resolve to the locale IntlRelativeFormat has data for, de-de
  this.set('locale', ['foo', 'bar', 'de-de']);
  this.render(hbs`{{format-relative date locale=locale}}`);
  assert.equal(this.$().text(), 'jetzt');
});
