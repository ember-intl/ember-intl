import { parse as _parse } from '@formatjs/icu-messageformat-parser';

/**
 * @private
 * @hide
 */
export default function parse(string: string) {
  // ! Sync with `lib/parse-options.js`
  return _parse(string, {
    ignoreTag: true,
  });
}
