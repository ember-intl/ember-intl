import { assert } from '@ember/debug';
import { getContext, settled, type TestContext } from '@ember/test-helpers';
import type { IntlService } from 'ember-intl';
import type { Translations } from 'ember-intl/types';

function pickLastLocale(localeName: string | string[]): string {
  if (typeof localeName === 'string') {
    return localeName;
  }

  return localeName[localeName.length - 1]!;
}

/**
 * Adds translations, as if the end-developer had somehow added them.
 *
 * The first parameter, `localeName`, is optional and defaults to
 * the current locale (the last enabled locale). So if you invoke the
 * test helper with just the translations, they will be added to the
 * last locale and all other locales will be tried before.
 *
 * @function addTranslations
 * @param {string} [localeName]
 * @param {object} translations
 */
export async function addTranslations(
  translations: Translations,
): Promise<void>;
export async function addTranslations(
  localeName: string,
  translations: Translations,
): Promise<void>;
export async function addTranslations(
  localeNameOrTranslations: string | Translations,
  translations?: Translations,
): Promise<void> {
  const { owner } = getContext() as TestContext;

  assert(
    'The current test has no owner. To use `addTranslations()`, make sure to call `setupTest()`, `setupRenderingTest()`, or `setupApplicationTest()`.',
    owner,
  );

  const intl = owner.lookup('service:intl') as IntlService;

  let _localeName: string;
  let _translations: Translations;

  if (typeof localeNameOrTranslations === 'object') {
    _localeName = pickLastLocale(intl.locale);
    _translations = localeNameOrTranslations;
  } else {
    _localeName = localeNameOrTranslations;
    _translations = translations!;
  }

  intl.addTranslations(_localeName, _translations);

  await settled();
}
