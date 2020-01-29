import { getContext } from '@ember/test-helpers';
import IntlService from '../../addon/services/intl';
import EmberObject from '@ember/object';
import Evented from '@ember/object/evented';

type IntlKeys = Exclude<keyof IntlService, keyof EmberObject | keyof Evented>;
type IntlFunctionProps = {
  [P in IntlKeys]: IntlService[P] extends Function ? IntlService[P] : never;
};

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
// export default function makeIntlHelper<T, A1>(fn: (intl: IntlService, arg1: A1) => T): (arg1: A1) => T;
export default function makeIntlHelper<T extends keyof IntlFunctionProps>(
  fn: T
): (...args: Parameters<IntlFunctionProps[T]>) => ReturnType<IntlFunctionProps[T]>;
export default function makeIntlHelper<T, A1, A2>(
  fn: (intl: IntlService, arg1: A1, arg2: A2) => T
): (arg1: A1, arg2: A2) => T;
export default function makeIntlHelper<T>(fn: (intl: IntlService, ...args: any[]) => T) {
  return (...args: any[]) => {
    // @ts-ignore result of getContext() is only typed as object
    const { owner } = getContext();
    const intl = owner.lookup('service:intl');

    if (typeof fn === 'string') {
      return intl[fn](...args);
    }

    return fn(intl, ...args);
  };
}
