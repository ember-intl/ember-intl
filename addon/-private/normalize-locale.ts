import { assert } from '@ember/debug';

function assertIsString(val: unknown): asserts val is string {
  assert('locale names must be strings', typeof val === 'string');
}

/**
 * @private
 * @hide
 */
export default function(localeName: string): string {
  assertIsString(localeName);

  return localeName.replace(/_/g, '-').toLowerCase();
}
