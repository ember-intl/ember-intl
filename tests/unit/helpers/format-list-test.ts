import { render } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';
import formatListHelper from 'ember-intl/helpers/format-list';
import type { TestContext } from 'ember-intl/test-support';
import { setupIntl } from 'ember-intl/test-support';
import { setupRenderingTest } from 'ember-qunit';
import { module, test } from 'qunit';

module('format-list-test', function (hooks) {
  setupRenderingTest(hooks);
  setupIntl(hooks, {});

  test('exists', function (this: TestContext, assert) {
    assert.expect(1);
    assert.ok(formatListHelper);
  });

  test('it should return a formatted string from a list', async function (this: TestContext, assert) {
    assert.expect(1);
    this.set('example', ['foo', 'bar']);

    await render(hbs`{{format-list this.example}}`);
    assert.strictEqual(this.element.textContent, 'foo and bar');
  });
});
