import { isArray } from '@ember/array';

/**
 * @private
 * @hide
 */
export default function(a, b) {
  if (!isArray(a) || !isArray(b)) {
    return false;
  }
  if (a === b) {
    return true;
  }

  return a.toString() === b.toString();
}
