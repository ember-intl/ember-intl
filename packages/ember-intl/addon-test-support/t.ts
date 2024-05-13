import { assert } from '@ember/debug';
import { getContext, type TestContext } from '@ember/test-helpers';
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
export function t(key: string, options?: TOptions): string {
  const context = getContext();

  assert(
    'To use `t()`, make sure to call `setupTest()`, `setupRenderingTest()`, or `setupApplicationTest()`.',
    context,
  );

  const { owner } = context as TestContext;

  const intl = owner.lookup('service:intl') as IntlService;

  return intl.t(key, options) as unknown as string;
}
