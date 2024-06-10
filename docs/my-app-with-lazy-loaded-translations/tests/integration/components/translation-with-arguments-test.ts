import { render } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';
import { setupIntl } from 'ember-intl/test-support';
import { setupRenderingTest } from 'my-app-with-lazy-loaded-translations/tests/helpers';
import { module, test } from 'qunit';

module(
  'Integration | Component | translation-with-arguments',
  function (hooks) {
    setupRenderingTest(hooks);

    module('de-de', function (nestedHooks) {
      setupIntl(nestedHooks, 'de-de');

      test('it renders', async function (assert) {
        await render(hbs`
          <TranslationWithArguments />
        `);

        assert
          .dom('[data-test-output="Translation with Arguments"]')
          .hasText(
            [
              't:components.translation-with-arguments.message:("name":"Sonja","numPhotos":12)',
              't:components.translation-with-arguments.message:("name":"Chris","numPhotos":0)',
              't:components.translation-with-arguments.message:("name":"Maki","numPhotos":1)',
            ].join(' '),
          );
      });
    });

    module('en-us', function (nestedHooks) {
      setupIntl(nestedHooks, 'en-us');

      test('it renders', async function (assert) {
        await render(hbs`
          <TranslationWithArguments />
        `);

        assert
          .dom('[data-test-output="Translation with Arguments"]')
          .hasText(
            [
              't:components.translation-with-arguments.message:("name":"Sonja","numPhotos":12)',
              't:components.translation-with-arguments.message:("name":"Chris","numPhotos":0)',
              't:components.translation-with-arguments.message:("name":"Maki","numPhotos":1)',
            ].join(' '),
          );
      });
    });
  },
);
