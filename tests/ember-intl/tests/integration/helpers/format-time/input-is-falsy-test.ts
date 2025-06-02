import { render } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';
import { setupIntl } from 'ember-intl/test-support';
import { module, test } from 'qunit';
import { setupRenderingTest } from 'test-app-for-ember-intl/tests/helpers';

module('Integration | Helper | format-time > input is falsy', function (hooks) {
  setupRenderingTest(hooks);
  setupIntl(hooks, 'en-us');

  test('input is 0', async function (assert) {
    await render(hbs`
      <div data-test-output>
        {{format-time 0}}
      </div>
    `);

    assert.dom('[data-test-output]').hasText(
      new Intl.DateTimeFormat('en-us', {
        hour: 'numeric',
        minute: 'numeric',
      }).format(0),
    );
  });

  test('input is an empty string', async function (assert) {
    await render(hbs`
      <div data-test-output>
        {{format-time ""}}
      </div>
    `);

    assert.dom('[data-test-output]').hasText(
      new Intl.DateTimeFormat('en-us', {
        hour: 'numeric',
        minute: 'numeric',
      }).format(0),
    );
  });

  test('input is null', async function (assert) {
    await render(hbs`
      <div data-test-output>
        {{format-time null}}
      </div>
    `);

    assert.dom('[data-test-output]').hasText('');
  });

  test('input is undefined', async function (assert) {
    await render(hbs`
      <div data-test-output>
        {{format-time undefined}}
      </div>
    `);

    assert.dom('[data-test-output]').hasText('');
  });
});
