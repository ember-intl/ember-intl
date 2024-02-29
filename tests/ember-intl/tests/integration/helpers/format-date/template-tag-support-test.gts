import { render } from '@ember/test-helpers';
import { formatDate } from 'ember-intl';
import { setLocale, setupIntl } from 'ember-intl/test-support';
import { module, test } from 'qunit';
import { setupRenderingTest } from 'test-app-for-ember-intl/tests/helpers';

module(
  'Integration | Helper | format-date > <template> tag support',
  function (hooks) {
    setupRenderingTest(hooks);
    setupIntl(hooks, 'en-us');

    test('it works', async function (assert) {
      const date = new Date('2014-01-23T18:00:44');

      await render(
        <template>
          <div data-test-output>
            {{formatDate date}}
          </div>
        </template>
      );

      assert.dom('[data-test-output]').hasText('1/23/2014');

      await setLocale('de-de');

      assert.dom('[data-test-output]').hasText('23.1.2014');
    });
  },
);
