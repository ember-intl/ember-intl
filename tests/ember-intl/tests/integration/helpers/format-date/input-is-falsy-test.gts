import { render } from '@ember/test-helpers';
import { formatDate } from 'ember-intl';
import { setupIntl } from 'ember-intl/test-support';
import { module, test } from 'qunit';
import { setupRenderingTest } from 'test-app-for-ember-intl/tests/helpers';

module('Integration | Helper | format-date > input is falsy', function (hooks) {
  setupRenderingTest(hooks);
  setupIntl(hooks, 'en-us');

  test('input is 0', async function (assert) {
    await render(
      <template>
        <div data-test-output>
          {{formatDate 0}}
        </div>
      </template>,
    );

    assert
      .dom('[data-test-output]')
      .hasText(new Intl.DateTimeFormat('en-us').format(0));
  });

  test('input is an empty string', async function (assert) {
    await render(
      <template>
        <div data-test-output>
          {{formatDate ""}}
        </div>
      </template>,
    );

    assert
      .dom('[data-test-output]')
      .hasText(new Intl.DateTimeFormat('en-us').format(0));
  });

  test('input is null', async function (assert) {
    await render(
      <template>
        <div data-test-output>
          {{formatDate null}}
        </div>
      </template>,
    );

    assert.dom('[data-test-output]').hasText('');
  });

  test('input is undefined', async function (assert) {
    await render(
      <template>
        <div data-test-output>
          {{formatDate undefined}}
        </div>
      </template>,
    );

    assert.dom('[data-test-output]').hasText('');
  });
});
