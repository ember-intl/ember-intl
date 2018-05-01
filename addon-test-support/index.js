import { getContext } from '@ember/test-helpers';
import _t from './-private/t';

export function t(...args) {
  let { owner } = getContext();

  return _t(owner, ...args);
}
