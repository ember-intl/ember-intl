import { getContext } from '@ember/test-helpers';
import type { TestContext } from '@ember/test-helpers';
import { assert } from '@ember/debug';
import type Evented from '@ember/object/evented';
import type Service from '@ember/service';
import type IntlService from 'ember-intl/services/intl';
import type { ConditionalKeys, RemoveFirstFromTuple } from './type-utils';

type IntlMethods = Exclude<ConditionalKeys<IntlService, (...args: unknown[]) => void>, keyof Service | keyof Evented>;

/**
 * Resolves the `intl` service and provides it to the `fn` as the first
 * argument. Returns the partially applied function.
 *
 * @private
 * @function
 * @param {function} fn
 * @return {function}
 * @hide
 */
export function makeIntlHelper<Fn extends (intl: IntlService, ...rest: unknown[]) => void>(
  fn: Fn
): (...args: RemoveFirstFromTuple<Parameters<Fn>>) => ReturnType<Fn>;
export function makeIntlHelper<Fn extends IntlMethods>(fn: Fn): IntlService[Fn];
export function makeIntlHelper(fn: ((intl: IntlService, ...rest: unknown[]) => void) | IntlMethods) {
  return (...args: unknown[]) => {
    const { owner } = getContext() as TestContext;
    assert(
      'The current test context has no owner. Did you forget to call `setupTest(hooks)`, `setupContext(this)` or some other test helper?',
      typeof owner === 'object' && typeof owner.lookup === 'function'
    );
    const intl = owner.lookup('service:intl') as IntlService;

    if (typeof fn === 'string') {
      // @ts-expect-error I tried all the things. Seems like this dynamism is
      // just not possible in TypeScript. Luckily `makeIntlHelper()` generic
      // types already reliably prevent any misuse, so we do not sacrifice any
      // safety here.
      return intl[fn](...args);
    }

    return fn(intl, ...args);
  };
}

export default makeIntlHelper;
