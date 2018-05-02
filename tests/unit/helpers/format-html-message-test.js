import hbs from 'htmlbars-inline-precompile';
import { module, test, skip } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import formatHtmlHelper from 'ember-intl/helpers/format-html-message';

module('format-html-message', function(hooks) {
  setupRenderingTest(hooks);

  hooks.beforeEach(function() {
    this.intl = this.owner.lookup('service:intl');
    this.intl.addTranslations('en-us', { foo: { bar: 'foo bar baz', baz: 'baz baz baz' } });
    this.intl.setLocale('en-us');
  });

  test('exists', function(assert) {
    assert.expect(1);
    assert.ok(formatHtmlHelper);
  });

  test('invoke the formatHTMLMessage directly', function(assert) {
    assert.expect(1);
    assert.equal(
      this.intl.formatHtmlMessage('<strong>Hello {name} {count, number}</strong>', {
        name: '<em>Jason</em>',
        count: 42000
      }).string,
      '<strong>Hello &lt;em&gt;Jason&lt;/em&gt; 42,000</strong>'
    );
  });

  test('invoke the formatHTMLMessage directly with inlined locale', function(assert) {
    assert.expect(1);

    let output = this.intl.formatHtmlMessage('<strong>Hello {name} {count, number}</strong>', {
      name: '<em>Jason</em>',
      count: 42000,
      locale: 'fr-fr'
    }).string;

    assert.equal(
      escape(output),
      '%3Cstrong%3EHello%20%26lt%3Bem%26gt%3BJason%26lt%3B/em%26gt%3B%2042%A0000%3C/strong%3E'
    );
  });

  test('message is formatted correctly with argument', async function(assert) {
    assert.expect(1);
    await render(hbs`{{format-html-message (l "Hello {name}") name="Jason"}}`);
    assert.equal(this.element.textContent, 'Hello Jason');
  });

  skip('should throw if called with out a value', async function(/*assert*/) {
    // await render(hbs`{{format-html-message}}`);
    // expectError(
    //   () => render(hbs`{{format-html-message}}`),
    //   ex => {
    //     assert.ok(
    //       ex.message.match(
    //         /Assertion Failed: \[ember-intl\] translation lookup attempted but no translation key was provided\./
    //       )
    //     );
    //   }
    // );
  });

  test('should allow for inlined html in the value', async function(assert) {
    assert.expect(1);
    await render(hbs`{{format-html-message (l "<strong>Hello {name}</strong>") name="Jason"}}`);
    assert.equal(this.element.innerHTML, '<strong>Hello Jason</strong>');
  });

  test('should escape arguments', async function(assert) {
    assert.expect(1);
    await render(hbs`{{format-html-message (l "{foo}") foo="<em>BAR</em>"}}`);
    assert.equal(this.element.innerHTML, '&lt;em&gt;BAR&lt;/em&gt;');
  });

  test('should allow for inlined html in the value but escape arguments', async function(assert) {
    assert.expect(1);
    await render(hbs`{{format-html-message (l "<strong>Hello {name}</strong>") name="<em>Jason</em>"}}`);
    assert.equal(this.element.innerHTML, '<strong>Hello &lt;em&gt;Jason&lt;/em&gt;</strong>');
  });
});
