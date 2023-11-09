import { isArray } from '@ember/array';

/**
 * @private
 * @hide
 */
export default function isArrayEqual(a: any, b: any): boolean {
  if (!isArray(a) || !isArray(b)) {
    return false;
  }
  if (a === b) {
    return true;
  }

  return a.toString() === b.toString();
}
