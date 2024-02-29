import { render } from '@ember/test-helpers';
import { formatList } from 'ember-intl';
import { setLocale, setupIntl } from 'ember-intl/test-support';
import { module, test } from 'qunit';
import { setupRenderingTest } from 'test-app/tests/helpers';

module(
  'Integration | Helper | format-list > <template> tag support',
  function (hooks) {
    setupRenderingTest(hooks);
    setupIntl(hooks, 'en-us');

    test('it works', async function (assert) {
      const list = ['apples', 'bananas', 'oranges'];

      await render(
        <template>
          <div data-test-output>
            {{formatList list}}
          </div>
        </template>
      );

      assert.dom('[data-test-output]').hasText('apples, bananas, and oranges');

      await setLocale('de-de');

      assert.dom('[data-test-output]').hasText('apples, bananas und oranges');
    });
  },
);
