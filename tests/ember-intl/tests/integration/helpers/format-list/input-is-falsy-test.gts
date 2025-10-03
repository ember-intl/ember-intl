import { array } from '@ember/helper';
import { formatList } from 'ember-intl';

import { render } from '@ember/test-helpers';
import { setupIntl } from 'ember-intl/test-support';
import { module, test } from 'qunit';
import { setupRenderingTest } from 'test-app-for-ember-intl/tests/helpers';

module('Integration | Helper | format-list > input is falsy', function (hooks) {
  setupRenderingTest(hooks);
  setupIntl(hooks, 'en-us');

  test('input is an empty array', async function (assert) {
    await render(<template>
    <div data-test-output>
    {{formatList (array)}}
    </div>
    </template>);

    assert.dom('[data-test-output]').hasText('');
  });

  test('input is null', async function (assert) {
    await render(<template>
    <div data-test-output>
    {{formatList null}}
    </div>
    </template>);

    assert.dom('[data-test-output]').hasText('');
  });

  test('input is undefined', async function (assert) {
    await render(<template>
    <div data-test-output>
    {{formatList undefined}}
    </div>
    </template>);

    assert.dom('[data-test-output]').hasText('');
  });
});
