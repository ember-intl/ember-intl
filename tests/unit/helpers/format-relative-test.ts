import hbs from 'htmlbars-inline-precompile';
import { module, test, skip } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import formatRelativehelper from 'ember-intl/helpers/format-relative';
import { setupIntl, TestContext } from 'ember-intl/test-support';

module('format-relative', function (hooks) {
  setupRenderingTest(hooks);
  setupIntl(hooks);

  hooks.beforeEach(function (this: TestContext) {
    this.intl.set('formats', { relative: { yearShort: { unit: 'year', style: 'short' } } });
  });

  test('exists', function (this: TestContext, assert) {
    assert.expect(1);
    assert.ok(formatRelativehelper);
  });

  test('invoke the formatRelative directly', function (this: TestContext, assert) {
    assert.expect(1);
    assert.equal(this.intl.formatRelative(-1, { unit: 'days' }), '1 day ago');
  });

  skip('should throw if called with out a value', function (/*assert*/) {
    // assert.expect(1);
    // expectError(() => render(hbs`{{format-relative}}`), ex => assert.ok(ex));
  });

  test('should support allowEmpty', async function (this: TestContext, assert) {
    assert.expect(1);
    await render(hbs`{{format-relative allowEmpty=true unit="day"}}`);
    assert.equal(this.element.textContent, '');
  });

  test('should handle short units', async function (this: TestContext, assert) {
    await render(hbs`{{format-relative -1 unit="second" style="short"}}`);
    assert.equal(this.element.textContent, '1 sec. ago');

    await render(hbs`{{format-relative -1 unit="minute" style="short"}}`);
    assert.equal(this.element.textContent, '1 min. ago');

    await render(hbs`{{format-relative -1 unit="hour" style="short"}}`);
    assert.equal(this.element.textContent, '1 hr. ago');

    await render(hbs`{{format-relative -1 unit="month" style="short"}}`);
    assert.equal(this.element.textContent, '1 mo. ago');

    await render(hbs`{{format-relative -1 unit="year" style="short"}}`);
    assert.equal(this.element.textContent, '1 yr. ago');
  });

  test('should handle inline format', async function (this: TestContext, assert) {
    await render(hbs`{{format-relative -1 format="yearShort"}}`);
    assert.equal(this.element.textContent, '1 yr. ago');
  });
});
