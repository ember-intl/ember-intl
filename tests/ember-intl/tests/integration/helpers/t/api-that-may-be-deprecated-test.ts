import { render } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';
import { setupIntl } from 'ember-intl/test-support';
import { module, test } from 'qunit';
import { setupRenderingTest } from 'test-app-for-ember-intl/tests/helpers';

module(
  'Integration | Helper | t > API that may be deprecated',
  function (hooks) {
    setupRenderingTest(hooks);
    setupIntl(hooks, 'en-us');

    test('input is null and allowEmpty is true', async function (assert) {
      await render(hbs`
        <div data-test-output>
          {{! @glint-expect-error }}
          {{t null allowEmpty=true}}
        </div>
      `);

      assert.dom('[data-test-output]').hasText('');
    });

    test('input is undefined and allowEmpty is true', async function (assert) {
      await render(hbs`
        <div data-test-output>
          {{! @glint-expect-error }}
          {{t undefined allowEmpty=true}}
        </div>
      `);

      assert.dom('[data-test-output]').hasText('');
    });
  },
);
