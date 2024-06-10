import {
  getContext,
  render,
  resetOnerror,
  setupOnerror,
  type TestContext,
} from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';
import type { IntlService } from 'ember-intl';
import { setupIntl } from 'ember-intl/test-support';
import { setupRenderingTest } from 'my-app-with-fallbacks/tests/helpers';
import { module, test } from 'qunit';

function ignoreFormatError() {
  const { owner } = getContext() as TestContext;

  const intl = owner.lookup('service:intl') as IntlService;

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

        await render(hbs`
          <TranslationWithArguments />
        `);

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

        await render(hbs`
          <TranslationWithArguments />
        `);

        assert.verifySteps(['@formatjs/intl throws an error']);

        resetOnerror();
      });
    });

    module('en-us', function (nestedHooks) {
      setupIntl(nestedHooks, 'en-us');

      test('it renders when we ignore FORMAT_ERROR', async function (assert) {
        ignoreFormatError();

        await render(hbs`
          <TranslationWithArguments />
        `);

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

        await render(hbs`
          <TranslationWithArguments />
        `);

        assert.verifySteps(['@formatjs/intl throws an error']);

        resetOnerror();
      });
    });
  },
);
