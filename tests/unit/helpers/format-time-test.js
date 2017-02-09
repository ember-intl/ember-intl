import hbs from 'htmlbars-inline-precompile';
import { moduleForComponent, test } from 'ember-qunit';
import formatTimeHelper from 'ember-intl/helpers/format-time';

const date = 1390518044403;
const locale = 'en-us';
let service, registry;

moduleForComponent('format-time', {
  integration: true,
  beforeEach() {
    registry = this.registry || this.container;
    service = this.container.lookup('service:intl');
    service.setLocale(locale);
  }
});

test('exists', function(assert) {
  assert.expect(1);
  assert.ok(formatTimeHelper);
});

test('invoke formatTime directly', function(assert) {
  assert.expect(1);

  const output = service.formatTime(date, {
    timeZone: 'UTC',
    locale: 'fr-fr'
  });

  // Try both for browser Intl data inconsistencies
  assert.ok(output === '23/1/2014' || output === '23/01/2014');
});

test('invoke formatTime directly with format', function(assert) {
  assert.expect(1);

  registry.register('formats:main', {
    time: {
      test: {
        timeZone: 'UTC',
        locale: 'fr-fr'
      }
    }
  }, { instantiate: false });

  const output = service.formatTime(date, { format: 'test' });

  // Try both for browser Intl data inconsistencies
  assert.ok(output === '23/1/2014' || output === '23/01/2014');
});

test('it should return a formatted string from a date string', function(assert) {
  assert.expect(1);
  this.set('dateString', 'Thu Jan 23 2014 18:00:44 GMT-0500 (EST)');

  // Must provide `timeZone` because: https://github.com/jasonmit/ember-intl/issues/21
  this.render(hbs`{{format-time dateString timeZone='UTC'}}`);
  assert.equal(this.$().text(), '1/23/2014');
});

test('it should return a formatted string from a timestamp', function(assert) {
  assert.expect(1);
  this.set('date', date);

  // Must provide `timeZone` because: https://github.com/jasonmit/ember-intl/issues/21
  this.render(hbs`{{format-time date timeZone='UTC'}}`);
  assert.equal(this.$().text(), '1/23/2014');
});

test('it should return a formatted string of just the time', function(assert) {
  assert.expect(1);
  this.set('date', date);
  this.render(hbs`{{format-time date hour='numeric' minute='numeric' timeZone='UTC'}}`);
  assert.equal(this.$().text(), '11:00 PM');
});

test('it should format the epoch timestamp', function(assert) {
  assert.expect(1);
  this.render(hbs`{{format-time 0}}`);
  assert.equal(this.$().text(), new Intl.DateTimeFormat(locale).format(0));
});

test('it should display the fallback if called with no value', function(assert) {
  assert.expect(1);
  this.render(hbs`{{format-time fallback="fallback value"}}`);
  assert.equal(this.$().text(), 'fallback value');
});

test('it should display the fallback if called with an undefined value', function(assert) {
  assert.expect(1);
  this.render(hbs`{{format-time undefined fallback="fallback value"}}`);
  assert.equal(this.$().text(), 'fallback value');
});
