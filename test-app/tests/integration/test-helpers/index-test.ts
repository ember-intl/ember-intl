import type { TestContext as BaseTestContext } from '@ember/test-helpers';
import type { IntlService } from 'ember-intl';
import {
  addTranslations,
  setLocale,
  setupIntl,
  t,
} from 'ember-intl/test-support';
import { module, test } from 'qunit';
import { setupRenderingTest } from 'test-app/tests/helpers';

interface TestContext extends BaseTestContext {
  intl: IntlService;
}

module('Integration | Test Helpers', function (hooks) {
  setupRenderingTest(hooks);

  module('setupIntl(hooks)', function (hooks) {
    setupIntl(hooks);

    test('hooks were properly executed and helpers work', async function (this: TestContext, assert) {
      assert.strictEqual(
        this.intl,
        this.owner.lookup('service:intl'),
        '`this.intl` shorthand is available',
      );

      assert.strictEqual(
        this.intl.t('some.translation'),
        't:some.translation:()',
        '`t` method serializes translation without variables',
      );
      assert.strictEqual(
        this.intl.t('some.translation', { foo: 'bar' }),
        't:some.translation:("foo":"bar")',
        '`t` method serializes translation with variables',
      );

      assert.strictEqual(
        this.intl.t('some.translation'),
        t('some.translation'),
        '`t` helper serializes translation without variables',
      );
      assert.strictEqual(
        this.intl.t('some.translation', { foo: 'bar' }),
        t('some.translation', { foo: 'bar' }),
        '`t` helper serializes translation with variables',
      );

      const germanLocale = 'de-de';
      assert.notDeepEqual(
        this.intl.locale,
        [germanLocale],
        `locale was not '${germanLocale} before switching to it`,
      );

      setLocale('de-de');
      assert.deepEqual(
        this.intl.locale,
        [germanLocale],
        `locale was switched with 'setLocale'`,
      );

      addTranslations({
        some: {
          german: {
            translation: 'Guten Tag.',
          },
        },
      });
      assert.strictEqual(
        this.intl.t('some.german.translation'),
        'Guten Tag.',
        'addTranslations: adds translations to currently active locale, if invoked without explicit locale',
      );

      const englishLocale = 'en-us';
      addTranslations(englishLocale, {
        some: {
          english: {
            translation: 'Good day, sir.',
          },
        },
      });
      assert.notOk(
        this.intl.exists('some.english.translation'),
        'addTranslations: if explicit locale give, does not add the translations to currently active locale',
      );

      setLocale(englishLocale);
      assert.strictEqual(
        this.intl.t('some.english.translation'),
        'Good day, sir.',
        'addTranslations: translations were added to explicitly given locale',
      );
    });
  });

  module('setupIntl(hooks, translations)', function () {
    module('With default locale', function (hooks) {
      setupIntl(hooks, {
        some: {
          translation: 'The cake is a lie.',
        },
      });

      test('hooks were properly executed and translations have been added', async function (this: TestContext, assert) {
        assert.strictEqual(
          this.intl,
          this.owner.lookup('service:intl'),
          '`this.intl` shorthand is available',
        );

        assert.strictEqual(
          this.intl.t('some.translation'),
          'The cake is a lie.',
          'translations that were provided to `setupIntl` have been added',
        );
      });
    });

    module('With a non-default locale', function (hooks) {
      const germanLocale = 'de-de';

      setupIntl(hooks, germanLocale, {
        some: {
          translation: 'Der Kuchen ist eine Lüge.',
        },
      });

      test('hooks were properly executed, locale was set and translations have been added', async function (this: TestContext, assert) {
        assert.strictEqual(
          this.intl,
          this.owner.lookup('service:intl'),
          '`this.intl` shorthand is available',
        );

        assert.deepEqual(
          this.intl.locale,
          [germanLocale],
          'locale has been switched',
        );

        assert.strictEqual(
          this.intl.t('some.translation'),
          'Der Kuchen ist eine Lüge.',
          'translations that were provided to `setupIntl` have been added',
        );
      });
    });
  });

  module(
    'setupIntl(hooks, translations) for nested translations',
    function (hooks) {
      setupIntl(hooks);

      test('hooks were properly executed and translations have been added (1)', async function (this: TestContext, assert) {
        const ENGLISH_LOCALE = 'en-us';

        addTranslations(ENGLISH_LOCALE, {
          some: {
            translation: 'The {foo} is a lie.',
            nested_translation: '{count, plural, =1 {Cake} other {Cakes}}',
          },
        });

        assert.strictEqual(
          this.intl.t('some.translation', {
            foo: this.intl.t('some.nested_translation', { count: 1 }),
          }),
          'The Cake is a lie.',
          '`t` method serializes translation with countables',
        );
      });

      test('hooks were properly executed and translations have been added (2)', async function (this: TestContext, assert) {
        assert.strictEqual(
          this.intl.t('some.translation', {
            foo: this.intl.t('some.nested_translation', { count: 1 }),
          }),
          't:some.translation:("foo":"t:some.nested_translation:("count":1)")',
          '`t` method serializes translation with countables',
        );
      });
    },
  );
});
