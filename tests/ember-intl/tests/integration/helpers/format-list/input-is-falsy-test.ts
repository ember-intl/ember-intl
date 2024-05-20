import { render } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';
import { setupIntl } from 'ember-intl/test-support';
import { module, test } from 'qunit';
import { setupRenderingTest } from 'test-app-for-ember-intl/tests/helpers';

module('Integration | Helper | format-list > input is falsy', function (hooks) {
  setupRenderingTest(hooks);
  setupIntl(hooks, 'en-us');

  test('input is an empty array', async function (assert) {
    await render(hbs`
      <div data-test-output>
        {{format-list (array)}}
      </div>
    `);

    assert.dom('[data-test-output]').hasText('');
  });

  test('input is null', async function (assert) {
    await render(hbs`
      <div data-test-output>
        {{format-list null}}
      </div>
    `);

    assert.dom('[data-test-output]').hasText('');
  });

  test('input is undefined', async function (assert) {
    await render(hbs`
      <div data-test-output>
        {{format-list undefined}}
      </div>
    `);

    assert.dom('[data-test-output]').hasText('');
  });
});
