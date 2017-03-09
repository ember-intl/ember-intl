import hbs from 'htmlbars-inline-precompile';
import { moduleForComponent, test } from 'ember-qunit';
import formatHtmlHelper from 'ember-intl/helpers/format-html-message';

let service, registry;

moduleForComponent('format-html-message', {
  integration: true,
  beforeEach() {
    registry = this.registry || this.container;
    service = this.container.lookup('service:intl');

    registry.injection('formatter', 'intl', 'service:intl');

    service.addTranslations('en', {
      foo: {
        bar: 'foo bar baz',
        baz: 'baz baz baz'
      }
    });

    service.setLocale('en');
  }
});

test('exists', function(assert) {
  assert.expect(1);
  assert.ok(formatHtmlHelper);
});

test('invoke the formatHTMLMessage directly', function(assert) {
  assert.expect(1);
  assert.equal(
    service.formatHtmlMessage("<strong>Hello {name} {count, number}</strong>", { name: "<em>Jason</em>", count: 42000}).string,
    "<strong>Hello &lt;em&gt;Jason&lt;/em&gt; 42,000</strong>"
  );
});

test('message is formatted correctly with argument', function(assert) {
  assert.expect(1);
  this.render(hbs`{{format-html-message (l "Hello {name}") name="Jason"}}`);
  assert.equal(this.$().text(), "Hello Jason");
});

test('should throw if called with out a value', function(assert) {
  assert.expect(1);

  try {
    this.render(hbs`{{format-html-message}}`);
  } catch(ex) {
    assert.ok(ex, 'raised error when not value is passed to format-html-message');
  }
});

test('should allow for inlined html in the value', function(assert) {
  assert.expect(1);
  this.render(hbs`{{format-html-message (l "<strong>Hello {name}</strong>") name="Jason"}}`);
  assert.equal(this.$().html(), "<strong>Hello Jason</strong>");
});

test('should escape arguments', function(assert) {
  assert.expect(1);
  this.render(hbs`{{format-html-message (l "{foo}") foo="<em>BAR</em>"}}`);
  assert.equal(this.$().html(), "&lt;em&gt;BAR&lt;/em&gt;");
});

test('should allow for inlined html in the value but escape arguments', function(assert) {
  assert.expect(1);
  this.render(hbs`{{format-html-message (l "<strong>Hello {name}</strong>") name="<em>Jason</em>"}}`);
  assert.equal(this.$().html(), "<strong>Hello &lt;em&gt;Jason&lt;/em&gt;</strong>");
});
