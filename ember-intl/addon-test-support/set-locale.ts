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
    'The current test context has no owner. Did you forget to call `setupTest(hooks)`, `setupContext(this)` or some other test helper?',
    typeof owner === 'object' && typeof owner.lookup === 'function',
  );

  const intl = owner.lookup('service:intl') as IntlService;

  intl.setLocale(localeName);

  await settled();
}
