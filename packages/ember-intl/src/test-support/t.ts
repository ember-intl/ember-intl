import { deprecate } from '@ember/debug';
import { getContext, type TestContext } from '@ember/test-helpers';

import type { IntlService } from '../index.ts';

type TParameters = Parameters<IntlService['t']>;

/**
 * Invokes the `t` method of the `intl` service.
 *
 * @deprecated
 * @function t
 * @param {string} key
 * @param {object} [options]
 * @return {string}
 */
export function t(key: TParameters[0], options?: TParameters[1]): string {
  deprecate(
    'The test helper t will be removed to encourage writing strong assertions. If possible, load translations in tests and always pass the string that you expect to see to hasText and includesText.',
    false,
    {
      for: 'ember-intl',
      id: 'ember-intl.remove-t-test-helper',
      since: {
        available: '8.3.0',
        enabled: '8.3.0',
      },
      until: '9.0.0',
      url: 'https://ember-intl.github.io/ember-intl/docs/test-helpers/t#alternatives',
    },
  );

  const { owner } = getContext() as TestContext;

  const intl = owner.lookup('service:intl');

  return intl.t(key, options);
}
