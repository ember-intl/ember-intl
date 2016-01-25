/**
 * Copyright 2015, Yahoo! Inc.
 * Copyrights licensed under the New BSD License. See the accompanying LICENSE file for terms.
 */

import hbs from 'htmlbars-inline-precompile';
import { moduleFor, test } from 'ember-qunit';
import formatDateHelper from 'ember-intl/helpers/format-date';

import { runAppend, runDestroy } from '../../helpers/run-append';
import createRenderer from '../../helpers/create-intl-block';

const date = 1390518044403;
const defaultLocale = 'en-us';

let view;

moduleFor('ember-intl@formatter:format-date', {
  needs: ['service:intl', 'helper:format-date'],
  beforeEach() {
    this.render = createRenderer.call(this, undefined);
  },
  afterEach() {
    runDestroy(view);
  }
});

test('exists', function(assert) {
  assert.expect(1);
  assert.ok(formatDateHelper);
});

test('invoke the formatDate directly', function(assert) {
  assert.expect(1);
  const service = this.container.lookup('service:intl');
  assert.equal(service.formatDate(date, {
    timeZone: 'UTC',
    locale: defaultLocale
  }), '1/23/2014');
});

test('should render empty string for a null value', function(assert) {
  assert.expect(1);
  view = this.render(hbs`{{format-date null}}`, defaultLocale);
  runAppend(view);
  assert.equal(view.$().text(), '');
});

test('should render empty string for an empty string value', function(assert) {
  assert.expect(1);
  view = this.render(hbs`{{format-date ''}}`, defaultLocale);
  runAppend(view);
  assert.equal(view.$().text(), '');
});

test('should render empty string for an undefined value', function(assert) {
  assert.expect(1);
  view = this.render(hbs`{{format-date undefined}}`, defaultLocale);
  runAppend(view);
  assert.equal(view.$().text(), '');
});

test('should render epoch date for a null value when allow empty is false', function(assert) {
  assert.expect(1);
  view = this.render(hbs`{{format-date null allowEmpty=false}}`, defaultLocale);
  runAppend(view);
  assert.equal(view.$().text(), new Intl.DateTimeFormat(defaultLocale).format(0));
});

test('it should return a formatted string from a date string', function(assert) {
  assert.expect(1);
  // Must provide `timeZone` because: https://github.com/yahoo/ember-intl/issues/21
  view = this.render(hbs`{{format-date date timeZone='UTC'}}`, defaultLocale);
  view.set('context', { date: date });
  runAppend(view);
  assert.equal(view.$().text(), '1/23/2014');
});

test('it should return a formatted string from a timestamp', function(assert) {
  assert.expect(1);
  // Must provide `timeZone` because: https://github.com/yahoo/ember-intl/issues/21
  view = this.render(hbs`{{format-date date timeZone='UTC'}}`, defaultLocale);
  view.set('context', { date: date });
  runAppend(view);
  assert.equal(view.$().text(), '1/23/2014');
});

test('it should return a formatted string of just the date', function(assert) {
  assert.expect(1);
  view = this.render(hbs`{{format-date date hour='numeric' minute='numeric' timeZone='UTC'}}`, defaultLocale);
  view.set('context', { date: date });
  runAppend(view);
  assert.equal(view.$().text(), '11:00 PM');
});

test('it should format the epoch timestamp', function(assert) {
  assert.expect(1);
  view = this.render(hbs`{{format-date 0}}`, defaultLocale);
  runAppend(view);
  assert.equal(view.$().text(), new Intl.DateTimeFormat(defaultLocale).format(0));
});
