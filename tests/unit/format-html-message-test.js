/**
 * Copyright 2015, Yahoo! Inc.
 * Copyrights licensed under the New BSD License. See the accompanying LICENSE file for terms.
 */

import Ember from 'ember';
import hbs from 'htmlbars-inline-precompile';
import { moduleFor, test } from 'ember-qunit';
import formatHtmlHelper from 'ember-intl/helpers/format-html-message';
import registerHelper from 'ember-intl/utils/register-helper';

import { runAppend, runDestroy } from '../helpers/run-append';
import createIntlBlock from '../helpers/create-intl-block';

var view;

moduleFor('ember-intl@formatter:format-html-message', {
    needs: ['service:intl'],
    beforeEach() {
        registerHelper('format-html-message', formatHtmlHelper, this.container);
        this.container.injection('formatter', 'intl', 'service:intl');
        this.render = createIntlBlock(this.container);
    },
    afterEach() {
        runDestroy(view);
    }
});

test('exists', function(assert) {
    assert.expect(1);
    assert.ok(formatHtmlHelper);
});

test('message is formatted correctly with argument', function(assert) {
    assert.expect(1);
    view = this.render(hbs`{{format-html-message "Hello {name}" name="Jason"}}`, 'en-us');
    runAppend(view);
    assert.equal(view.$().text(), "Hello Jason");
});

test('should throw if called with out a value', function(assert) {
    assert.expect(1);
    view = this.render(hbs`{{format-html-message}}`);
    assert.throws(runAppend(view), Error, 'raised error when not value is passed to format-html-message', 'en-us');
});

test('should allow for inlined html in the value', function(assert) {
    assert.expect(1);
    view = this.render(hbs`{{format-html-message "<strong>Hello {name}</strong>" name="Jason"}}`, 'en-us');
    runAppend(view);
    assert.equal(view.$().html(), "<strong>Hello Jason</strong>");
});

test('should escape arguments', function(assert) {
    assert.expect(1);
    view = this.render(hbs`{{format-html-message "{foo}" foo="<em>BAR</em>"}}`, 'en-us');
    runAppend(view);
    assert.equal(view.$().html(), "&lt;em&gt;BAR&lt;/em&gt;");
});

test('should allow for inlined html in the value but escape arguments', function(assert) {
    assert.expect(1);
    view = this.render(hbs`{{format-html-message "<strong>Hello {name}</strong>" name="<em>Jason</em>"}}`, 'en-us');
    runAppend(view);
    assert.equal(view.$().html(), "<strong>Hello &lt;em&gt;Jason&lt;/em&gt;</strong>");
});
