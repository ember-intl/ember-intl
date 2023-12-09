import { assert } from '@ember/debug';
import { getContext, settled, type TestContext } from '@ember/test-helpers';
import type { IntlService } from 'ember-intl';

/**
 * Update the locale, as if the end-user had changed it.
 *
 * @function setLocale
 * @param {string|string[]} localeName
 */
export async function setLocale(localeName: string | string[]): Promise<void> {
  const { owner } = getContext() as TestContext;

  assert(
    'The current test has no owner. To use `setLocale()`, make sure to call `setupTest()`, `setupRenderingTest()`, or `setupApplicationTest()`.',
    owner,
  );

  const intl = owner.lookup('service:intl') as IntlService;

  intl.setLocale(localeName);

  await settled();
}
