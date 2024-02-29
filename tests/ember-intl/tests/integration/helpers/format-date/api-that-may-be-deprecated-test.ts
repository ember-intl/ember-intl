import { render } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';
import { setupIntl } from 'ember-intl/test-support';
import { module, test } from 'qunit';
import { setupRenderingTest } from 'test-app-for-ember-intl/tests/helpers';

module(
  'Integration | Helper | format-date > API that may be deprecated',
  function (hooks) {
    setupRenderingTest(hooks);
    setupIntl(hooks, 'en-us');

    test('input is null and allowEmpty is false', async function (assert) {
      await render(hbs`
        <div data-test-output>
          {{format-date null allowEmpty=false}}
        </div>
      `);

      assert
        .dom('[data-test-output]')
        .hasText(new Intl.DateTimeFormat('en-us').format(0));
    });

    test('input is null and allowEmpty is true', async function (assert) {
      await render(hbs`
        <div data-test-output>
          {{format-date null allowEmpty=true}}
        </div>
      `);

      assert.dom('[data-test-output]').hasText('');
    });

    test('input is undefined and allowEmpty is false', async function (assert) {
      await render(hbs`
        <div data-test-output>
          {{format-date undefined allowEmpty=false}}
        </div>
      `);

      assert
        .dom('[data-test-output]')
        .hasText(new Intl.DateTimeFormat('en-us').format(new Date()));
    });

    test('input is undefined and allowEmpty is true', async function (assert) {
      await render(hbs`
        <div data-test-output>
          {{format-date undefined allowEmpty=true}}
        </div>
      `);

      assert.dom('[data-test-output]').hasText('');
    });
  },
);
