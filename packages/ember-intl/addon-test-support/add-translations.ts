import { assert } from '@ember/debug';
import { getContext, settled, type TestContext } from '@ember/test-helpers';
import type { IntlService } from 'ember-intl';
import type { Translations } from 'ember-intl/types';

/**
 * Updates the translations as if you had somehow added them (e.g.
 * via lazy loading).
 *
 * @function addTranslations
 * @param {string} locale
 * @param {object} translations
 */
export async function addTranslations(
  locale: string,
  translations: Translations,
): Promise<void> {
  const { owner } = getContext() as TestContext;

  assert(
    'The current test has no owner. To use `addTranslations()`, make sure to call `setupTest()`, `setupRenderingTest()`, or `setupApplicationTest()`.',
    owner,
  );

  const intl = owner.lookup('service:intl') as IntlService;

  intl.addTranslations(locale, translations);

  await settled();
}
