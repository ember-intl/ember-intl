import { render } from '@ember/test-helpers';
import { setupIntl } from 'ember-intl/test-support';
import TranslationWithArguments from 'my-v1-classic-app-with-lazy-loaded-translations/components/translation-with-arguments';
import { setupRenderingTest } from 'my-v1-classic-app-with-lazy-loaded-translations/tests/helpers';
import { module, test } from 'qunit';

module(
  'Integration | Component | translation-with-arguments',
  function (hooks) {
    setupRenderingTest(hooks);

    module('de-de', function (nestedHooks) {
      setupIntl(nestedHooks, 'de-de');

      test('it renders', async function (assert) {
        await render(<template><TranslationWithArguments /></template>);

        assert
          .dom('[data-test-output="Translation with Arguments"]')
          .hasText(
            [
              't:components.translation-with-arguments.message',
              't:components.translation-with-arguments.message',
              't:components.translation-with-arguments.message',
            ].join(' '),
          );
      });
    });

    module('en-us', function (nestedHooks) {
      setupIntl(nestedHooks, 'en-us');

      test('it renders', async function (assert) {
        await render(<template><TranslationWithArguments /></template>);

        assert
          .dom('[data-test-output="Translation with Arguments"]')
          .hasText(
            [
              't:components.translation-with-arguments.message',
              't:components.translation-with-arguments.message',
              't:components.translation-with-arguments.message',
            ].join(' '),
          );
      });
    });
  },
);
