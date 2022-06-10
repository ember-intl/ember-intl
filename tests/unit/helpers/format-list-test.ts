import { hbs } from 'ember-cli-htmlbars';
import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import formatListHelper from 'ember-intl/helpers/format-list';
import { setupIntl, TestContext } from 'ember-intl/test-support';

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

    // Must provide `timeZone` because: https://github.com/ember-intl/ember-intl/issues/21
    await render(hbs`{{format-list this.example}}`);
    assert.equal(this.element.textContent, 'foo and bar');
  });
});
