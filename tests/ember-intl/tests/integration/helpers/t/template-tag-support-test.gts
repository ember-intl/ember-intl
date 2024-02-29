import { render } from '@ember/test-helpers';
import { t } from 'ember-intl';
import { setLocale, setupIntl } from 'ember-intl/test-support';
import { module, test } from 'qunit';
import { setupRenderingTest } from 'test-app/tests/helpers';

module(
  'Integration | Helper | t > <template> tag support',
  function (hooks) {
    setupRenderingTest(hooks);
    setupIntl(hooks, 'en-us');

    test('it works', async function (assert) {
      await render(
        <template>
          <div data-test-output>
            {{t "smoke-tests.parent.child"}}
          </div>
        </template>
      );

      assert.dom('[data-test-output]').hasText('Hello world!');

      await setLocale('de-de');

      assert.dom('[data-test-output]').hasText('Hallo Welt!');
    });
  },
);
