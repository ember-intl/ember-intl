import { assert } from '@ember/debug';
import type { TestContext } from '@ember/test-helpers';
import { getContext } from '@ember/test-helpers';
import type { IntlService } from 'ember-intl';
import type { TOptions } from 'ember-intl/services/intl';

/**
 * Invokes the `t` method of the `intl` service.
 *
 * @function t
 * @param {string} key
 * @param {object} [options]
 * @return {string}
 */
export default function t(key: string, options?: TOptions) {
  const { owner } = getContext() as TestContext;

  assert(
    'The current test context has no owner. Did you forget to call `setupTest(hooks)`, `setupContext(this)` or some other test helper?',
    typeof owner === 'object' && typeof owner.lookup === 'function',
  );

  const intl = owner.lookup('service:intl') as IntlService;

  return intl.t(key, options);
}
