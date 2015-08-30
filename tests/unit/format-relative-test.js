/**
 * Copyright 2015, Yahoo! Inc.
 * Copyrights licensed under the New BSD License. See the accompanying LICENSE file for terms.
 */

import Ember from 'ember';
import hbs from 'htmlbars-inline-precompile';
import { moduleFor, test } from 'ember-qunit';
import formatRelativehelper from 'ember-intl/helpers/format-relative';
import registerHelper from 'ember-intl/utils/register-helper';
import { runAppend, runDestroy } from '../helpers/run-append';
import createIntlBlock from '../helpers/create-intl-block';
import modernHelperTest from '../helpers/test';

const { run:emberRun } = Ember;

let view, registry;

moduleFor('ember-intl@formatter:format-relative', {
  needs: ['service:intl'],
  beforeEach() {
    registry =  this.registry || this.container;
    registerHelper('format-relative', formatRelativehelper, registry);

    registry.register('formats:main', {
      relative: {
        hours: {
          units: 'hour',
          style: 'numeric'
        }
      }
    });

    registry.optionsForType('formats', {
      singleton:   true,
      instantiate: false
    });

    this.render = createIntlBlock(registry);
  },
  afterEach() {
    runDestroy(view);
  }
});

test('exists', function(assert) {
  assert.expect(1);
  assert.ok(formatRelativehelper);
});

test('invoke the formatRelative directly', function(assert) {
  assert.expect(1);
  const service = this.container.lookup('service:intl');
  emberRun(() => { service.setLocale('en-us'); });
  assert.equal(service.formatRelative(new Date()), 'now', {});
});

test('should throw if called with out a value', function(assert) {
  assert.expect(1);
  view = this.render(hbs`{{format-relative}}`);
  try {
    runAppend(view);
  } catch(ex) {
    assert.ok(ex, 'raised error when not value is passed to format-relative');
  }
});

test('can specify a `value` and `now` on the options hash', function(assert) {
  assert.expect(1);
  view = this.render(hbs`{{format-relative 2000 now=0}}`, 'en-us');
  runAppend(view);
  assert.equal(view.$().text(), 'in 2 seconds');
});

modernHelperTest('can specify a `interval` to trigger recompute', function(assert) {
  assert.expect(2);
  view = this.render(hbs`{{format-relative date interval=1000}}`, 'en-us');
  view.set('context', { date: new Date() });
  runAppend(view);
  assert.equal(view.$().text(), 'now');
  stop();
  setTimeout(() => {
    start();
    assert.equal(view.$().text(), '1 second ago');
  }, 1001);
});

test('should return relative time in hours, not best fit', function(assert) {
  assert.expect(1);
  view = this.render(hbs`{{format-relative date now=0 format="hours"}}`, 'en-us');
  view.set('context', { date: (1000 * 60 * 60 * 24) * 2 }); // two days
  runAppend(view);
  assert.equal(view.$().text(), 'in 48 hours');
});

test('should return now', function(assert) {
  assert.expect(1);
  view = this.render(hbs`{{format-relative date}}`, 'en-us');
  view.set('context', { date: new Date().getTime() });
  runAppend(view);
  assert.equal(view.$().text(), 'now');
});
