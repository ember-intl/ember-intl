/**
 * Copyright 2015, Yahoo! Inc.
 * Copyrights licensed under the New BSD License. See the accompanying LICENSE file for terms.
 */

import hbs from 'htmlbars-inline-precompile';
import { moduleFor, test } from 'ember-qunit';
import formatHtmlHelper from 'ember-intl/helpers/format-html-message';
import registerHelper from 'ember-intl/utils/register-helper';
import Translation from 'ember-intl/models/translation';

import { runAppend, runDestroy } from '../helpers/run-append';
import createIntlBlock from '../helpers/create-intl-block';
import intlGet from '../../helpers/intl-get';

let view, registry;

moduleFor('ember-intl@formatter:format-html-message', {
  needs: ['service:intl', 'ember-intl@adapter:-intl-adapter'],
  beforeEach() {
    registry = this.registry || this.container;
    registerHelper('format-html-message', formatHtmlHelper, registry);
    registry.register('helper:intl-get', intlGet);
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
  view = this.render(hbs`{{format-html-message "Hello {name}" name="Jason"}}`, 'en-us');
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

test('can look up translations by id/key', function(assert) {
  assert.expect(1);
  view = this.render(hbs`{{format-html-message id="foo.bar"}}`, 'en-us');
  runAppend(view);
  assert.equal(view.$().text(), "foo bar baz");
});
