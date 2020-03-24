import hbs from 'htmlbars-inline-precompile';
import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import formatTimeHelper from 'ember-intl/helpers/format-time';

const date = 1390518044403;

module('format-time-test', function (hooks) {
  setupRenderingTest(hooks);

  hooks.beforeEach(function () {
    this.intl = this.owner.lookup('service:intl');
    this.intl.set('formats', { relative: { hours: { units: 'hour', style: 'numeric' } } });
  });

  test('exists', function (assert) {
    assert.expect(1);
    assert.ok(formatTimeHelper);
  });

  test('invoke formatTime directly', function (assert) {
    assert.expect(1);

    const output = this.intl.formatTime(date, { timeZone: 'UTC', locale: 'fr-fr' });

    // Try both for browser Intl data inconsistencies
    assert.ok(output === '23/1/2014' || output === '23/01/2014');
  });

  test('invoke formatTime directly with format', function (assert) {
    assert.expect(1);

    this.intl.set('formats', { time: { test: { timeZone: 'UTC', locale: 'fr-fr' } } });

    const output = this.intl.formatTime(date, { format: 'test' });

    // Try both for browser Intl data inconsistencies
    assert.ok(output === '23/1/2014' || output === '23/01/2014');
  });

  test('should support allowEmpty', async function (assert) {
    assert.expect(1);
    await render(hbs`{{format-time allowEmpty=true}}`);
    assert.equal(this.element.textContent, '');
  });

  test('it should return a formatted string from a date string', async function (assert) {
    assert.expect(1);
    this.set('dateString', 'Thu Jan 23 2014 18:00:44 GMT-0500 (EST)');

    // Must provide `timeZone` because: https://github.com/ember-intl/ember-intl/issues/21
    await render(hbs`{{format-time dateString timeZone='UTC'}}`);
    assert.equal(this.element.textContent, '1/23/2014');
  });

  test('it should return a formatted string from a timestamp', async function (assert) {
    assert.expect(1);
    this.set('date', date);

    // Must provide `timeZone` because: https://github.com/ember-intl/ember-intl/issues/21
    await render(hbs`{{format-time date timeZone='UTC'}}`);
    assert.equal(this.element.textContent, '1/23/2014');
  });

  test('it should return a formatted string of just the time', async function (assert) {
    assert.expect(1);
    this.set('date', date);
    await render(hbs`{{format-time date hour='numeric' minute='numeric' timeZone='UTC'}}`);
    assert.equal(this.element.textContent, '11:00 PM');
  });

  test('it should format the epoch timestamp', async function (assert) {
    assert.expect(1);
    await render(hbs`{{format-time 0}}`);
    assert.equal(this.element.textContent, new Intl.DateTimeFormat('en-us').format(0));
  });
});
