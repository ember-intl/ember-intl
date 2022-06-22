import { render } from '@ember/test-helpers';
import { htmlSafe } from '@ember/template';
import { setupRenderingTest } from 'ember-qunit';
import { hbs } from 'ember-cli-htmlbars';
import { module, test } from 'qunit';
import { setupIntl } from 'ember-intl/test-support';
import type { TestContext } from 'ember-intl/test-support';

module('format-message (html)', function (hooks) {
  setupRenderingTest(hooks);
  setupIntl(hooks, 'en-us', { foo: { bar: 'foo bar baz', baz: 'baz baz baz' } });

  test('invoke the formatMessage directly', function (this: TestContext, assert) {
    assert.expect(1);
    assert.strictEqual(
      this.intl
        .formatMessage(`'<strong>'Hello {name} {count, number}'</strong>'`, {
          htmlSafe: true,
          name: '<em>Jason</em>',
          count: 42000,
        })
        .toString(),
      '<strong>Hello &lt;em&gt;Jason&lt;/em&gt; 42,000</strong>'
    );
  });

  test('arguments marked as safe-string is not escaped', function (this: TestContext, assert) {
    assert.expect(2);

    assert.strictEqual(
      this.intl
        .formatMessage(`'<strong>'Welcome {name}!'</strong>'`, {
          htmlSafe: true,
          name: htmlSafe('<em>Alexander</em>'),
        })
        .toString(),
      '<strong>Welcome <em>Alexander</em>!</strong>'
    );

    assert.strictEqual(
      this.intl
        .formatMessage(`<strong>Welcome {name}!</strong>`, {
          htmlSafe: true,
          name: htmlSafe('<em>Alexander</em>'),
        })
        .toString(),
      '<strong>Welcome <em>Alexander</em>!</strong>'
    );
  });

  test('invoke the formatMessage directly with inlined locale', function (this: TestContext, assert) {
    assert.expect(1);

    const output = this.intl
      .formatMessage(`'<strong>'Hello {name} {count, number}'</strong>'`, {
        htmlSafe: true,
        name: '<em>Jason</em>',
        count: 42000,
        locale: 'pt-br',
      })
      .toString();

    assert.strictEqual(
      escape(output),
      '%3Cstrong%3EHello%20%26lt%3Bem%26gt%3BJason%26lt%3B/em%26gt%3B%2042.000%3C/strong%3E'
    );
  });

  test('should handle dynamic attributes', function (this: TestContext, assert) {
    assert.expect(2);

    assert.strictEqual(
      this.intl
        .formatMessage(`'<'a href="{link}"'>'text'</a>'`, {
          htmlSafe: true,
          link: 'http://formatjs.io',
        })
        .toString(),
      '<a href="http://formatjs.io">text</a>'
    );

    assert.strictEqual(
      this.intl
        .formatMessage(`<a href="{link}">text</a>`, {
          htmlSafe: true,
          link: 'http://formatjs.io',
        })
        .toString(),
      '<a href="http://formatjs.io">text</a>'
    );
  });

  test('should handle static attributes', function (this: TestContext, assert) {
    assert.expect(2);

    assert.strictEqual(
      this.intl
        .formatMessage(`Fields marked '<'strong class="primary"'>'*'</strong>' are required`, {
          htmlSafe: true,
        })
        .toString(),
      'Fields marked <strong class="primary">*</strong> are required'
    );

    assert.strictEqual(
      this.intl
        .formatMessage(`Fields marked <strong class="primary">*</strong> are required`, {
          htmlSafe: true,
        })
        .toString(),
      'Fields marked <strong class="primary">*</strong> are required'
    );
  });

  test('should handle static attributes, approach #2', function (this: TestContext, assert) {
    assert.expect(1);

    const output = this.intl
      .formatMessage(`Fields marked '<strong class="primary">*</strong>' are required`, {
        htmlSafe: true,
      })
      .toString();

    assert.strictEqual(output, 'Fields marked <strong class="primary">*</strong> are required');
  });

  test('message is formatted correctly with argument', async function (this: TestContext, assert) {
    assert.expect(1);
    await render(hbs`{{format-message "Hello {name}" name="Jason" htmlSafe=true}}`);
    assert.strictEqual(this.element.textContent, 'Hello Jason');
  });

  test('should allow for inlined html in the value', async function (this: TestContext, assert) {
    assert.expect(1);
    await render(hbs`{{format-message "'<strong>'Hello {name}'</strong>'" name="Jason" htmlSafe=true}}`);
    assert.strictEqual((this.element as HTMLElement).innerHTML, '<strong>Hello Jason</strong>');
  });

  test('should escape arguments', async function (this: TestContext, assert) {
    assert.expect(1);
    await render(hbs`{{format-message "{foo}" foo="<em>BAR</em>" htmlSafe=true}}`);
    assert.strictEqual((this.element as HTMLElement).innerHTML, '&lt;em&gt;BAR&lt;/em&gt;');
  });

  test('should allow for inlined html in the value but escape arguments', async function (this: TestContext, assert) {
    assert.expect(2);
    await render(hbs`{{format-message "'<strong>'Hello {name}'</strong>'" name="<em>Jason</em>" htmlSafe=true}}`);
    assert.strictEqual((this.element as HTMLElement).innerHTML, '<strong>Hello &lt;em&gt;Jason&lt;/em&gt;</strong>');
    await render(hbs`{{format-message "<strong>Hello {name}</strong>" name="<em>Jason</em>" htmlSafe=true}}`);
    assert.strictEqual((this.element as HTMLElement).innerHTML, '<strong>Hello &lt;em&gt;Jason&lt;/em&gt;</strong>');
  });
});
