/**
 * Copyright 2015, Yahoo! Inc.
 * Copyrights licensed under the New BSD License. See the accompanying LICENSE file for terms.
 */

import Ember from 'ember';
import { moduleFor, test } from 'ember-qunit';
import formatRelativehelper from 'ember-intl/helpers/format-relative';
import registerHelper from 'ember-intl/utils/register-helper';

import { runAppend, runDestroy } from '../helpers/run-append';
import createIntlBlock from '../helpers/create-intl-block';

var view;

moduleFor('ember-intl@formatter:format-relative', {
    needs: ['service:intl'],
    beforeEach: function () {
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

        this.container.injection('formatter', 'intl', 'service:intl');
        this.intlBlock = createIntlBlock(this.container);
    },
    afterEach: function () {
        runDestroy(view);
    }
});

test('exists', function(assert) {
    assert.expect(1);
    assert.ok(formatRelativehelper);
});

test('invoke the formatRelative directly', function(assert) {
    assert.expect(1);
    var service = this.container.lookup('service:intl');
    assert.equal(service.formatRelative(new Date()), 'now', {});
});

test('should throw if called with out a value', function(assert) {
    assert.expect(1);
    view = this.intlBlock('{{format-relative}}');
    assert.throws(runAppend(view), Error, 'raised error when not value is passed to format-relative');
});

test('can specify a `value` and `now` on the options hash', function(assert) {
    assert.expect(1);
    view = this.intlBlock('{{format-relative 2000 now=0}}', { locale: 'en' });
    runAppend(view);
    assert.equal(view.$().text(), 'in 2 seconds');
});

test('should return relative time in hours, not best fit', function(assert) {
    assert.expect(1);
    var twoDays = (1000 * 60 * 60 * 24) * 2;
    view = this.intlBlock('{{format-relative ' + twoDays + ' now=0 format="hours"}}', { locale: 'en' });
    runAppend(view);
    assert.equal(view.$().text(), 'in 48 hours');
});


test('should return now', function(assert) {
    assert.expect(1);
    view = this.intlBlock('{{format-relative ' + new Date().getTime() + '}}', { locale: 'en' });
    runAppend(view);
    assert.equal(view.$().text(), 'now');
});
