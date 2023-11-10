import { assert } from '@ember/debug';
import type { TestContext } from '@ember/test-helpers';
import { getContext } from '@ember/test-helpers';
import type { IntlService } from 'ember-intl';

/**
 * Invokes the `setLocale` method of the `intl` service.
 *
 * @function setLocale
 * @param {string|string[]} localeName
 */
export function setLocale(localeName: string | string[]): void {
  const { owner } = getContext() as TestContext;

  assert(
    'The current test context has no owner. Did you forget to call `setupTest(hooks)`, `setupContext(this)` or some other test helper?',
    typeof owner === 'object' && typeof owner.lookup === 'function',
  );

  const intl = owner.lookup('service:intl') as IntlService;

  intl.setLocale(localeName);
}
