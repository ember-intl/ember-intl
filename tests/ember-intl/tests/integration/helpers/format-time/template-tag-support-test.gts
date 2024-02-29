import { render } from '@ember/test-helpers';
import { formatTime } from 'ember-intl';
import { setLocale, setupIntl } from 'ember-intl/test-support';
import { module, test } from 'qunit';
import { setupRenderingTest } from 'test-app-for-ember-intl/tests/helpers';

module(
  'Integration | Helper | format-time > <template> tag support',
  function (hooks) {
    setupRenderingTest(hooks);
    setupIntl(hooks, 'en-us');

    test('it works', async function (assert) {
      const date = new Date('2014-01-23T18:00:44');

      await render(
        <template>
          <div data-test-output>
            {{formatTime date}}
          </div>
        </template>
      );

      assert.dom('[data-test-output]').hasText('6:00 PM');

      await setLocale('de-de');

      assert.dom('[data-test-output]').hasText('18:00');
    });
  },
);
