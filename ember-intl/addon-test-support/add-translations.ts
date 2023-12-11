import { assert } from '@ember/debug';
import { getContext, settled, type TestContext } from '@ember/test-helpers';
import type { IntlService } from 'ember-intl';
import type { Translations } from 'ember-intl/types';

function pickLastLocale(locale: string | string[]): string {
  if (typeof locale === 'string') {
    return locale;
  }

  return locale[locale.length - 1]!;
}

/**
 * Updates the translations as if you had somehow added them (e.g.
 * via lazy loading).
 *
 * The first parameter, `locale`, is optional and defaults to the last
 * currently active locale. For example, if the current locales are
 * `['en-ca', 'en-gb', 'en-us']`, then the translations will be added
 * to `'en-us'` by default.
 *
 * @function addTranslations
 * @param {string} [locale]
 * @param {object} translations
 */
export async function addTranslations(
  translations: Translations,
): Promise<void>;
export async function addTranslations(
  locale: string,
  translations: Translations,
): Promise<void>;
export async function addTranslations(
  localeOrTranslations: string | Translations,
  translations?: Translations,
): Promise<void> {
  const { owner } = getContext() as TestContext;

  assert(
    'The current test has no owner. To use `addTranslations()`, make sure to call `setupTest()`, `setupRenderingTest()`, or `setupApplicationTest()`.',
    owner,
  );

  const intl = owner.lookup('service:intl') as IntlService;

  let _locale: string;
  let _translations: Translations;

  if (typeof localeOrTranslations === 'object') {
    _locale = pickLastLocale(intl.locale);
    _translations = localeOrTranslations;
  } else {
    _locale = localeOrTranslations;
    _translations = translations!;
  }

  intl.addTranslations(_locale, _translations);

  await settled();
}
