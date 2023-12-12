import { render } from '@ember/test-helpers';
import { formatRelative } from 'ember-intl';
import { setLocale, setupIntl } from 'ember-intl/test-support';
import { module, test } from 'qunit';
import { setupRenderingTest } from 'test-app/tests/helpers';

module(
  'Integration | Helper | format-relative > <template> tag support',
  function (hooks) {
    setupRenderingTest(hooks);
    setupIntl(hooks, 'en-us');

    test('it works', async function (assert) {
      const number = -1;

      await render(
        <template>
          <div data-test-output>
            {{formatRelative number unit="year"}}
          </div>
        </template>
      );

      assert.dom('[data-test-output]').hasText('1 year ago');

      await setLocale('de-de');

      assert.dom('[data-test-output]').hasText('vor 1 Jahr');
    });
  },
);
