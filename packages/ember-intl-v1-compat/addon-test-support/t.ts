import { getContext, type TestContext } from '@ember/test-helpers';
import type { IntlService } from 'ember-intl';

type TParameters = Parameters<IntlService['t']>;

/**
 * Invokes the `t` method of the `intl` service.
 *
 * @function t
 * @param {string} key
 * @param {object} [options]
 * @return {string}
 */
export function t(key: TParameters[0], options?: TParameters[1]): string {
  const { owner } = getContext() as TestContext;

  const intl = owner.lookup('service:intl');

  return intl.t(key, options);
}
