import { render, resetOnerror, setupOnerror } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';
import { addTranslations, setupIntl, t } from 'ember-intl/test-support';
import { module, test } from 'qunit';
import { setupRenderingTest } from 'test-app-for-ember-intl/tests/helpers';

module(
  'Integration | Helper | t > input is not well-defined',
  function (hooks) {
    setupRenderingTest(hooks);
    setupIntl(hooks, 'en-us');

    test('input is null', async function (assert) {
      await render(hbs`
        <div data-test-output>
          {{! @glint-expect-error }}
          {{t null}}
        </div>
      `);

      assert.dom('[data-test-output]').hasText('t:null:()');
    });

    test('input is undefined', async function (assert) {
      await render(hbs`
        <div data-test-output>
          {{! @glint-expect-error }}
          {{t undefined}}
        </div>
      `);

      assert.dom('[data-test-output]').hasText('t:undefined:()');
    });

    test('input is an empty string', async function (assert) {
      await addTranslations('en-us', {
        '': 'Hello, world!',
      });

      setupOnerror(() => {
        assert.step('@formatjs/intl throws an error');
      });

      await render(hbs`
        <div data-test-output>
          {{t ""}}
        </div>
      `);

      assert.verifySteps(['@formatjs/intl throws an error']);

      resetOnerror();
    });

    test('input is false', async function (assert) {
      await render(hbs`
        <div data-test-output>
          {{! @glint-expect-error }}
          {{t false}}
        </div>
      `);

      assert.dom('[data-test-output]').hasText('t:false:()');
    });

    test('translation does not exist', async function (assert) {
      await render(hbs`
        <div data-test-output="1">
          {{t "key.does.not.exist"}}
        </div>
      `);

      assert.dom('[data-test-output="1"]').hasText(t('key.does.not.exist'));
    });
  },
);
