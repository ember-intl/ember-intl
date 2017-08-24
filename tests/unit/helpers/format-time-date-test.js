import hbs from 'htmlbars-inline-precompile';
import { moduleForComponent, test } from 'ember-qunit';
import FormatDateTimeHelper from 'ember-intl/helpers/format-datetime';

const date = 1390518044403;
const locale = 'en-us';

moduleForComponent('format-datetime-date', {
  integration: true,
  beforeEach() {
    this.container.lookup('service:intl').setLocale(locale);
  }
});

test('exists', function(assert) {
  assert.expect(1);
  assert.ok(FormatDateTimeHelper);
});

test('invoke the formatDateTime directly', function(assert) {
  assert.expect(1);
  const service = this.container.lookup('service:intl');
  assert.equal(service.formatDateTime(date, { timeZone: 'UTC', locale }), '1/23/2014');
});

test('should render empty string for a null value', function(assert) {
  assert.expect(1);
  this.render(hbs`{{format-datetime null}}`);
  assert.equal(this.$().text(), '');
});

test('should render empty string for an empty string value', function(assert) {
  assert.expect(1);
  this.render(hbs`{{format-datetime}}`);
  assert.equal(this.$().text(), '');
});

test('should render empty string for an undefined value', function(assert) {
  assert.expect(1);
  this.render(hbs`{{format-datetime undefined}}`);
  assert.equal(this.$().text(), '');
});

test('should display the fallback if called with no value', function(assert) {
  assert.expect(1);
  this.render(hbs`{{format-datetime fallback="fallback value"}}`);
  assert.equal(this.$().text(), 'fallback value');
});

test('should display the fallback if called with an undefined value', function(assert) {
  assert.expect(1);
  this.render(hbs`{{format-datetime undefined fallback="fallback value"}}`);
  assert.equal(this.$().text(), 'fallback value');
});

test('should render epoch date for a null value when allow empty is false', function(assert) {
  assert.expect(1);
  this.render(hbs`{{format-datetime null allowEmpty=false}}`);
  assert.equal(this.$().text(), new Intl.DateTimeFormat(locale).format(0));
});

test('it should return a formatted string from a date string', function(assert) {
  assert.expect(1);
  // Must provide `timeZone` because: https://github.com/jasonmit/ember-intl/issues/21
  this.render(hbs`{{format-datetime date timeZone='UTC'}}`);
  this.set('date', date);
  assert.equal(this.$().text(), '1/23/2014');
});

test('it should return a formatted string from a timestamp', function(assert) {
  assert.expect(1);
  // Must provide `timeZone` because: https://github.com/jasonmit/ember-intl/issues/21
  this.render(hbs`{{format-datetime date timeZone='UTC'}}`);
  this.set('date', date);
  assert.equal(this.$().text(), '1/23/2014');
});

test('it should return a formatted string of just the date', function(assert) {
  assert.expect(1);
  this.render(hbs`{{format-datetime date hour='numeric' minute='numeric' timeZone='UTC'}}`);
  this.set('date', date);
  assert.equal(this.$().text(), '11:00 PM');
});

test('it should format the epoch timestamp', function(assert) {
  assert.expect(1);
  this.render(hbs`{{format-datetime 0}}`);
  assert.equal(this.$().text(), new Intl.DateTimeFormat(locale).format(0));
});
