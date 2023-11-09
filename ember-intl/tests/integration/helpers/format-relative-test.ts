import { render } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';
import type { TestContext } from 'ember-intl/test-support';
import { setupIntl } from 'ember-intl/test-support';
import { setupRenderingTest } from 'ember-qunit';
import { module, test } from 'qunit';

module('Integration | Helper | format-relative', function (hooks) {
  setupRenderingTest(hooks);
  setupIntl(
    hooks,
    {},
    {
      formats: {
        relative: {
          yearShort: {
            style: 'short',
            unit: 'year',
          },
        },
      },
    },
  );

  test('invoke the formatRelative directly', function (this: TestContext, assert) {
    const output = this.intl.formatRelative(-1, {
      unit: 'days',
    });

    assert.strictEqual(output, '1 day ago');
  });

  test('should support allowEmpty', async function (assert) {
    await render(hbs`
      {{format-relative allowEmpty=true unit="day"}}
    `);

    assert.dom().hasText('');
  });

  test('should handle short units', async function (assert) {
    await render(hbs`
      {{format-relative -1 unit="second" style="short"}}
    `);

    assert.dom().hasText('1 sec. ago');

    await render(hbs`
      {{format-relative -1 unit="minute" style="short"}}
    `);

    assert.dom().hasText('1 min. ago');

    await render(hbs`
      {{format-relative -1 unit="hour" style="short"}}
    `);

    assert.dom().hasText('1 hr. ago');

    await render(hbs`
      {{format-relative -1 unit="month" style="short"}}
    `);

    assert.dom().hasText('1 mo. ago');

    await render(hbs`
      {{format-relative -1 unit="year" style="short"}}
    `);

    assert.dom().hasText('1 yr. ago');
  });

  test('should handle inline format', async function (assert) {
    await render(hbs`
      {{format-relative -1 format="yearShort"}}
    `);

    assert.dom().hasText('1 yr. ago');
  });
});
