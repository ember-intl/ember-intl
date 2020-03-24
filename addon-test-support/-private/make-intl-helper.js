import { getContext } from '@ember/test-helpers';

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
export default (fn) => (...args) => {
  const { owner } = getContext();
  const intl = owner.lookup('service:intl');

  if (typeof fn === 'string') {
    return intl[fn](...args);
  }

  return fn(intl, ...args);
};
