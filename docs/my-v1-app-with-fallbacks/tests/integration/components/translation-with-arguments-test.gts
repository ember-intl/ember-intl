/* eslint-disable @typescript-eslint/no-unsafe-enum-comparison */
import {
  getContext,
  render,
  resetOnerror,
  setupOnerror,
  type TestContext,
} from '@ember/test-helpers';
import { setupIntl } from 'ember-intl/test-support';
import TranslationWithArguments from 'my-v1-app-with-fallbacks/components/translation-with-arguments';
import { setupRenderingTest } from 'my-v1-app-with-fallbacks/tests/helpers';
import { module, test } from 'qunit';

function ignoreFormatError(): void {
  const { owner } = getContext() as TestContext;

  const intl = owner.lookup('service:intl');

  intl.setOnFormatjsError((error) => {
    switch (error.code) {
      case 'FORMAT_ERROR':
      case 'MISSING_TRANSLATION': {
        // Do nothing
        break;
      }

      default: {
        throw error;
      }
    }
  });
}

module(
  'Integration | Component | translation-with-arguments',
  function (hooks) {
    setupRenderingTest(hooks);

    module('de-de', function (nestedHooks) {
      setupIntl(nestedHooks, 'de-de');

      test('it renders when we ignore FORMAT_ERROR', async function (assert) {
        ignoreFormatError();

        await render(<template><TranslationWithArguments /></template>);

        assert
          .dom('[data-test-output="Translation with Arguments"]')
          .hasText(
            [
              '{name} hat {numPhotos, plural, =0 {keine Fotos} =1 {ein Foto} other {# Fotos}}.',
              '{name} hat {numPhotos, plural, =0 {keine Fotos} =1 {ein Foto} other {# Fotos}}.',
              'hat 0 Fotos.',
            ].join(' '),
          );
      });

      test('throws an error by default', async function (assert) {
        setupOnerror((error: Error) => {
          assert.true(error.message.includes('FORMAT_ERROR'));

          assert.step('@formatjs/intl throws an error');
        });

        await render(<template><TranslationWithArguments /></template>);

        assert.verifySteps(['@formatjs/intl throws an error']);

        resetOnerror();
      });
    });

    module('en-us', function (nestedHooks) {
      setupIntl(nestedHooks, 'en-us');

      test('it renders when we ignore FORMAT_ERROR', async function (assert) {
        ignoreFormatError();

        await render(<template><TranslationWithArguments /></template>);

        assert
          .dom('[data-test-output="Translation with Arguments"]')
          .hasText(
            [
              '{name} has {numPhotos, plural, =0 {no photos} =1 {a photo} other {# photos}}.',
              '{name} has {numPhotos, plural, =0 {no photos} =1 {a photo} other {# photos}}.',
              'has 0 photos.',
            ].join(' '),
          );
      });

      test('throws an error by default', async function (assert) {
        setupOnerror((error: Error) => {
          assert.true(error.message.includes('FORMAT_ERROR'));

          assert.step('@formatjs/intl throws an error');
        });

        await render(<template><TranslationWithArguments /></template>);

        assert.verifySteps(['@formatjs/intl throws an error']);

        resetOnerror();
      });
    });
  },
);
