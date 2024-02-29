import { render } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';
import { setupIntl } from 'ember-intl/test-support';
import { module, test } from 'qunit';
import { setupRenderingTest } from 'test-app/tests/helpers';

module('Integration | Helper | format-date > input is falsy', function (hooks) {
  setupRenderingTest(hooks);
  setupIntl(hooks, 'en-us');

  test('input is 0', async function (assert) {
    await render(hbs`
      <div data-test-output>
        {{format-date 0}}
      </div>
    `);

    assert
      .dom('[data-test-output]')
      .hasText(new Intl.DateTimeFormat('en-us').format(0));
  });

  test('input is an empty string', async function (assert) {
    await render(hbs`
      <div data-test-output>
        {{format-date ''}}
      </div>
    `);

    assert.dom('[data-test-output]').hasText('');
  });

  test('input is null', async function (assert) {
    await render(hbs`
      <div data-test-output>
        {{format-date null}}
      </div>
    `);

    assert.dom('[data-test-output]').hasText('');
  });

  test('input is undefined', async function (assert) {
    await render(hbs`
      <div data-test-output>
        {{format-date undefined}}
      </div>
    `);

    assert.dom('[data-test-output]').hasText('');
  });
});
