import TranslationWithArguments from 'my-v2-app-with-lazy-loaded-translations/components/translation-with-arguments';

import { render } from '@ember/test-helpers';
import { setupIntl } from 'ember-intl/test-support';
import { setupRenderingTest } from 'my-v1-classic-app/tests/helpers';
import { module, test } from 'qunit';

module(
  'Integration | Component | translation-with-arguments',
  function (hooks) {
    setupRenderingTest(hooks);

    module('de-de', function (nestedHooks) {
      setupIntl(nestedHooks, 'de-de');

      test('it renders', async function (assert) {
        await render(<template>
        <TranslationWithArguments />
        </template>);

        assert
          .dom('[data-test-output="Translation with Arguments"]')
          .hasText(
            [
              'Sonja hat 12 Fotos.',
              'Chris hat keine Fotos.',
              'Maki hat ein Foto.',
            ].join(' '),
          );
      });
    });

    module('en-us', function (nestedHooks) {
      setupIntl(nestedHooks, 'en-us');

      test('it renders', async function (assert) {
        await render(<template>
        <TranslationWithArguments />
        </template>);

        assert
          .dom('[data-test-output="Translation with Arguments"]')
          .hasText(
            [
              'Sonja has 12 photos.',
              'Chris has no photos.',
              'Maki has a photo.',
            ].join(' '),
          );
      });
    });
  },
);
