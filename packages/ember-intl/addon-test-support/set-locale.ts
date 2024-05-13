import { assert } from '@ember/debug';
import { getContext, settled, type TestContext } from '@ember/test-helpers';
import type { IntlService } from 'ember-intl';

/**
 * Updates the locale as if the user had changed their preferred language.
 *
 * @function setLocale
 * @param {string|string[]} locale
 */
export async function setLocale(locale: string | string[]): Promise<void> {
  const { owner } = getContext() as TestContext;

  assert(
    'The current test has no owner. To use `setLocale()`, make sure to call `setupTest()`, `setupRenderingTest()`, or `setupApplicationTest()`.',
    owner,
  );

  const intl = owner.lookup('service:intl') as IntlService;

  intl.setLocale(locale);

  await settled();
}
