import hbs from 'htmlbars-inline-precompile';
import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import formatDateHelper from 'ember-intl/helpers/format-date';

const date = 1390518044403;
const locale = 'en-us';

module('format-date', function(hooks) {
  setupRenderingTest(hooks);

  test('exists', function(assert) {
    assert.expect(1);
    assert.ok(formatDateHelper);
  });

  test('invoke the formatDate directly', function(assert) {
    assert.expect(1);
    const service = this.owner.lookup('service:intl');
    assert.equal(service.formatDate(date, { timeZone: 'UTC', locale }), '1/23/2014');
  });

  test('should render empty string for a null value', async function(assert) {
    assert.expect(1);
    await render(hbs`{{format-date null}}`);
    assert.equal(this.element.textContent, '');
  });

  test('should render empty string for an empty string value', async function(assert) {
    assert.expect(1);
    await render(hbs`{{format-date ''}}`);
    assert.equal(this.element.textContent, '');
  });

  test('should render empty string for an undefined value', async function(assert) {
    assert.expect(1);
    await render(hbs`{{format-date undefined}}`);
    assert.equal(this.element.textContent, '');
  });

  test('should render epoch date for a null value when allow empty is false', async function(assert) {
    assert.expect(1);
    await render(hbs`{{format-date null allowEmpty=false}}`);
    assert.equal(this.element.textContent, new Intl.DateTimeFormat(locale).format(0));
  });

  test('should support allowEmpty', async function(assert) {
    assert.expect(1);
    await render(hbs`{{format-date allowEmpty=true}}`);
    assert.equal(this.element.textContent, '');
  });

  test('it should return a formatted string from a date string', async function(assert) {
    assert.expect(1);
    // Must provide `timeZone` because: https://github.com/jasonmit/ember-intl/issues/21
    await render(hbs`{{format-date date timeZone='UTC'}}`);
    this.set('date', date);
    assert.equal(this.element.textContent, '1/23/2014');
  });

  test('it should return a formatted string from a timestamp', async function(assert) {
    assert.expect(1);
    // Must provide `timeZone` because: https://github.com/jasonmit/ember-intl/issues/21
    await render(hbs`{{format-date date timeZone='UTC'}}`);
    this.set('date', date);
    assert.equal(this.element.textContent, '1/23/2014');
  });

  test('it should return a formatted string of just the date', async function(assert) {
    assert.expect(1);
    await render(hbs`{{format-date date hour='numeric' minute='numeric' timeZone='UTC'}}`);
    this.set('date', date);
    assert.equal(this.element.textContent, '11:00 PM');
  });

  test('it should format the epoch timestamp', async function(assert) {
    assert.expect(1);
    await render(hbs`{{format-date 0}}`);
    assert.equal(this.element.textContent, new Intl.DateTimeFormat(locale).format(0));
  });
});
