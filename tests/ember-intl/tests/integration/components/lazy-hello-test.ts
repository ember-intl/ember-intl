import { render } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';
import { addTranslations, setupIntl, t } from 'ember-intl/test-support';
import { module, test } from 'qunit';
import { setupRenderingTest } from 'test-app-for-ember-intl/tests/helpers';

module('Integration | Component | lazy-hello', function (hooks) {
  setupRenderingTest(hooks);

  module('en-us', function (nestedHooks) {
    setupIntl(nestedHooks, 'en-us');

    test('Translations are loaded before the component is rendered', async function (assert) {
      await addTranslations({
        'lazy-hello': {
          message: 'Hello, {name}!',
        },
      });

      await render(hbs`
        <LazyHello @name="Zoey" />
      `);

      assert
        .dom('[data-test-message]')
        .hasText('Hello, Zoey!', 'We can write assertions against a string.')
        .doesNotIncludeText(
          't:lazy-hello.message:("name":"Zoey")',
          'We should not see the missing-message string.',
        )
        .hasText(
          t('lazy-hello.message', { name: 'Zoey' }),
          'We can write assertions against the test helper t().',
        );
    });

    test('Translations are loaded after the component is rendered', async function (assert) {
      await render(hbs`
        <LazyHello @name="Zoey" />
      `);

      assert
        .dom('[data-test-message]')
        .doesNotIncludeText(
          'Hello, Zoey!',
          'Before translations are loaded, we cannot write assertions against a string.',
        )
        .hasText(
          't:lazy-hello.message:("name":"Zoey")',
          'Before translations are loaded, we should see the missing-message string.',
        )
        .hasText(
          t('lazy-hello.message', { name: 'Zoey' }),
          'Before translations are loaded, we can write assertions against the test helper t().',
        );

      await addTranslations({
        'lazy-hello': {
          message: 'Hello, {name}!',
        },
      });

      assert
        .dom('[data-test-message]')
        .hasText(
          'Hello, Zoey!',
          'After translations are loaded, we can write assertions against a string.',
        )
        .doesNotIncludeText(
          't:lazy-hello.message:("name":"Zoey")',
          'After translations are loaded, we should not see the missing-message string.',
        )
        .hasText(
          t('lazy-hello.message', { name: 'Zoey' }),
          'After translations are loaded, we can write assertions against the test helper t().',
        );
    });

    test('When translations are loaded after rendering, we need to add await to see the effect', async function (assert) {
      await render(hbs`
        <LazyHello @name="Zoey" />
      `);

      addTranslations({
        'lazy-hello': {
          message: 'Hello, {name}!',
        },
      });

      assert
        .dom('[data-test-message]')
        .doesNotIncludeText(
          'Hello, Zoey!',
          "Because we didn't add `await`, we still cannot write assertions against a string.",
        )
        .hasText(
          't:lazy-hello.message:("name":"Zoey")',
          "Because we didn't add `await`, we still see the missing-message string.",
        )
        .doesNotIncludeText(
          t('lazy-hello.message', { name: 'Zoey' }),
          "Because we didn't add `await`, we no longer can write assertions against the test helper t().",
        );
    });
  });

  module('de-de', function (nestedHooks) {
    setupIntl(nestedHooks, 'de-de');

    test('Translations are loaded before the component is rendered', async function (assert) {
      await addTranslations('de-de', {
        'lazy-hello': {
          message: 'Hallo, {name}!',
        },
      });

      await render(hbs`
        <LazyHello @name="Zoey" />
      `);

      assert
        .dom('[data-test-message]')
        .hasText('Hallo, Zoey!', 'We can write assertions against a string.')
        .doesNotIncludeText(
          't:lazy-hello.message:("name":"Zoey")',
          'We should not see the missing-message string.',
        )
        .hasText(
          t('lazy-hello.message', { name: 'Zoey' }),
          'We can write assertions against the test helper t().',
        );
    });

    test('Translations are loaded after the component is rendered', async function (assert) {
      await render(hbs`
        <LazyHello @name="Zoey" />
      `);

      assert
        .dom('[data-test-message]')
        .doesNotIncludeText(
          'Hallo, Zoey!',
          'Before translations are loaded, we cannot write assertions against a string.',
        )
        .hasText(
          't:lazy-hello.message:("name":"Zoey")',
          'Before translations are loaded, we should see the missing-message string.',
        )
        .hasText(
          t('lazy-hello.message', { name: 'Zoey' }),
          'Before translations are loaded, we can write assertions against the test helper t().',
        );

      await addTranslations('de-de', {
        'lazy-hello': {
          message: 'Hallo, {name}!',
        },
      });

      assert
        .dom('[data-test-message]')
        .hasText(
          'Hallo, Zoey!',
          'After translations are loaded, we can write assertions against a string.',
        )
        .doesNotIncludeText(
          't:lazy-hello.message:("name":"Zoey")',
          'After translations are loaded, we should not see the missing-message string.',
        )
        .hasText(
          t('lazy-hello.message', { name: 'Zoey' }),
          'After translations are loaded, we can write assertions against the test helper t().',
        );
    });

    test('When translations are loaded after rendering, we need to add await to see the effect', async function (assert) {
      await render(hbs`
        <LazyHello @name="Zoey" />
      `);

      addTranslations('de-de', {
        'lazy-hello': {
          message: 'Hallo, {name}!',
        },
      });

      assert
        .dom('[data-test-message]')
        .doesNotIncludeText(
          'Hallo, Zoey!',
          "Because we didn't add `await`, we still cannot write assertions against a string.",
        )
        .hasText(
          't:lazy-hello.message:("name":"Zoey")',
          "Because we didn't add `await`, we still see the missing-message string.",
        )
        .doesNotIncludeText(
          t('lazy-hello.message', { name: 'Zoey' }),
          "Because we didn't add `await`, we no longer can write assertions against the test helper t().",
        );
    });
  });
});
