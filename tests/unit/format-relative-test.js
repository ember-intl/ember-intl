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

var view;

moduleFor('ember-intl@formatter:format-relative', {
    needs: ['service:intl'],
    beforeEach() {
        registerHelper('format-relative', formatRelativehelper, this.container);

        this.container.register('formats:main', {
            relative: {
                hours: {
                    units: 'hour',
                    style: 'numeric'
                }
            }
        });

        this.container.optionsForType('formats', {
            singleton:   true,
            instantiate: false
        });

        this.render = createIntlBlock(this.container);
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
    let service = this.container.lookup('service:intl');
    Ember.run(() => { service.set('locale', 'en-us'); });
    assert.equal(service.formatRelative(new Date()), 'now', {});
});

test('should throw if called with out a value', function(assert) {
    assert.expect(1);
    view = this.render(hbs`{{format-relative}}`);
    assert.throws(runAppend(view), Error, 'raised error when not value is passed to format-relative');
});

test('can specify a `value` and `now` on the options hash', function(assert) {
    assert.expect(1);
    view = this.render(hbs`{{format-relative 2000 now=0}}`, { locale: 'en-us' });
    runAppend(view);
    assert.equal(view.$().text(), 'in 2 seconds');
});

test('should return relative time in hours, not best fit', function(assert) {
    assert.expect(1);
    view = this.render(hbs`{{format-relative date now=0 format="hours"}}`, { locale: 'en-us' });
    view.set('context', { date: (1000 * 60 * 60 * 24) * 2 }); // two days
    runAppend(view);
    assert.equal(view.$().text(), 'in 48 hours');
});


test('should return now', function(assert) {
    assert.expect(1);
    view = this.render(hbs`{{format-relative date}}`, { locale: 'en-us' });
    view.set('context', { date: new Date().getTime() });
    runAppend(view);
    assert.equal(view.$().text(), 'now');
});
