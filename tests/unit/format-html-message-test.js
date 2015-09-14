/**
 * Copyright 2015, Yahoo! Inc.
 * Copyrights licensed under the New BSD License. See the accompanying LICENSE file for terms.
 */

import hbs from 'htmlbars-inline-precompile';
import { moduleFor, test } from 'ember-qunit';
import formatHtmlHelper from 'ember-intl/helpers/format-html-message';
import registerHelper from 'ember-intl/utils/register-helper';
import Translation from 'ember-intl/models/translation';
import lHelper from 'ember-intl/helpers/l';

import { runAppend, runDestroy } from '../helpers/run-append';
import createIntlBlock from '../helpers/create-intl-block';

let view, registry;

moduleFor('ember-intl@formatter:format-html-message', {
  needs: ['service:intl', 'ember-intl@adapter:-intl-adapter'],
  beforeEach() {
    registry = this.registry || this.container;
    registerHelper('format-html-message', formatHtmlHelper, registry);
    registerHelper('l', lHelper, registry);
    registry.injection('formatter', 'intl', 'service:intl');
    registry.register('ember-intl@translation:en-us', Translation.extend({
      foo: {
        bar: 'foo bar baz',
        baz: 'baz baz baz'
      }
    }));

    this.render = createIntlBlock(registry);
  },
  afterEach() {
    runDestroy(view);
  }
});

test('exists', function(assert) {
  assert.expect(1);
  assert.ok(formatHtmlHelper);
});

test('invoke the formatHTMLMessage directly', function(assert) {
  assert.expect(1);
  const service = this.container.lookup('service:intl');
  assert.equal(
    service.formatHtmlMessage("<strong>Hello {name}</strong>", { name: "<em>Jason</em>" }),
    "<strong>Hello &lt;em&gt;Jason&lt;/em&gt;</strong>"
  );
});

test('message is formatted correctly with argument', function(assert) {
  assert.expect(1);
  view = this.render(hbs`{{format-html-message (l "Hello {name}") name="Jason"}}`, 'en-us');
  runAppend(view);
  assert.equal(view.$().text(), "Hello Jason");
});

test('should throw if called with out a value', function(assert) {
  assert.expect(1);
  view = this.render(hbs`{{format-html-message}}`);
  try {
    runAppend(view);
  } catch(ex) {
    assert.ok(ex, 'raised error when not value is passed to format-html-message');
  }
});

test('should allow for inlined html in the value', function(assert) {
  assert.expect(1);
  view = this.render(hbs`{{format-html-message (l "<strong>Hello {name}</strong>") name="Jason"}}`, 'en-us');
  runAppend(view);
  assert.equal(view.$().html(), "<strong>Hello Jason</strong>");
});

test('should escape arguments', function(assert) {
  assert.expect(1);
  view = this.render(hbs`{{format-html-message (l "{foo}") foo="<em>BAR</em>"}}`, 'en-us');
  runAppend(view);
  assert.equal(view.$().html(), "&lt;em&gt;BAR&lt;/em&gt;");
});

test('should allow for inlined html in the value but escape arguments', function(assert) {
  assert.expect(1);
  view = this.render(hbs`{{format-html-message (l "<strong>Hello {name}</strong>") name="<em>Jason</em>"}}`, 'en-us');
  runAppend(view);
  assert.equal(view.$().html(), "<strong>Hello &lt;em&gt;Jason&lt;/em&gt;</strong>");
});
