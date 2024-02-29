import { render } from '@ember/test-helpers';
import { formatNumber } from 'ember-intl';
import { setLocale, setupIntl } from 'ember-intl/test-support';
import { module, test } from 'qunit';
import { setupRenderingTest } from 'test-app/tests/helpers';

module(
  'Integration | Helper | format-number > <template> tag support',
  function (hooks) {
    setupRenderingTest(hooks);
    setupIntl(hooks, 'en-us');

    test('it works', async function (assert) {
      const number = 12345678.9;

      await render(
        <template>
          <div data-test-output>
            {{formatNumber number}}
          </div>
        </template>
      );

      assert.dom('[data-test-output]').hasText('12,345,678.9');

      await setLocale('de-de');

      assert.dom('[data-test-output]').hasText('12.345.678,9');
    });
  },
);
