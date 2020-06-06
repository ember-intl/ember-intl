import { render } from '@ember/test-helpers';
import { htmlSafe } from '@ember/string';
import { setupRenderingTest } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import { module, test } from 'qunit';

module('format-message (html)', function (hooks) {
  setupRenderingTest(hooks);

  hooks.beforeEach(function () {
    this.intl = this.owner.lookup('service:intl');
    this.intl.addTranslations('en-us', { foo: { bar: 'foo bar baz', baz: 'baz baz baz' } });
  });

  test('invoke the formatMessage directly', function (assert) {
    assert.expect(1);
    assert.equal(
      this.intl.formatMessage(`'<strong>'Hello {name} {count, number}'</strong>'`, {
        htmlSafe: true,
        name: '<em>Jason</em>',
        count: 42000,
      }).string,
      '<strong>Hello &lt;em&gt;Jason&lt;/em&gt; 42,000</strong>'
    );
  });

  test('arguments marked as safe-string is not escaped', function (assert) {
    assert.expect(1);
    assert.equal(
      this.intl.formatMessage(`'<strong>'Welcome {name}!'</strong>'`, {
        htmlSafe: true,
        name: htmlSafe('<em>Alexander</em>'),
      }).string,
      '<strong>Welcome <em>Alexander</em>!</strong>'
    );
  });

  test('invoke the formatMessage directly with inlined locale', function (assert) {
    assert.expect(1);

    let output = this.intl.formatMessage(`'<strong>'Hello {name} {count, number}'</strong>'`, {
      htmlSafe: true,
      name: '<em>Jason</em>',
      count: 42000,
      locale: 'pt-br',
    }).string;

    assert.equal(
      escape(output),
      '%3Cstrong%3EHello%20%26lt%3Bem%26gt%3BJason%26lt%3B/em%26gt%3B%2042.000%3C/strong%3E'
    );
  });

  test('should handle dynamic attributes', function (assert) {
    assert.expect(1);

    let output = this.intl.formatMessage(`'<'a href="{link}"'>'text'</a>'`, {
      htmlSafe: true,
      link: 'http://formatjs.io',
    }).string;

    assert.equal(output, '<a href="http://formatjs.io">text</a>');
  });

  test('should handle static attributes', function (assert) {
    assert.expect(1);

    let output = this.intl.formatMessage(`Fields marked '<'strong class="primary"'>'*'</strong>' are required`, {
      htmlSafe: true,
    }).string;

    assert.equal(output, 'Fields marked <strong class="primary">*</strong> are required');
  });

  test('message is formatted correctly with argument', async function (assert) {
    assert.expect(1);
    await render(hbs`{{format-message "Hello {name}" name="Jason" htmlSafe=true}}`);
    assert.equal(this.element.textContent, 'Hello Jason');
  });

  test('should allow for inlined html in the value', async function (assert) {
    assert.expect(1);
    await render(hbs`{{format-message "'<strong>'Hello {name}'</strong>'" name="Jason" htmlSafe=true}}`);
    assert.equal(this.element.innerHTML, '<strong>Hello Jason</strong>');
  });

  test('should escape arguments', async function (assert) {
    assert.expect(1);
    await render(hbs`{{format-message "{foo}" foo="<em>BAR</em>" htmlSafe=true}}`);
    assert.equal(this.element.innerHTML, '&lt;em&gt;BAR&lt;/em&gt;');
  });

  test('should allow for inlined html in the value but escape arguments', async function (assert) {
    assert.expect(1);
    await render(hbs`{{format-message "'<strong>'Hello {name}'</strong>'" name="<em>Jason</em>" htmlSafe=true}}`);
    assert.equal(this.element.innerHTML, '<strong>Hello &lt;em&gt;Jason&lt;/em&gt;</strong>');
  });
});
