import { parse } from '@formatjs/icu-messageformat-parser';

/**
 * @private
 * @hide
 */
export default function parseString(string: string) {
  // ! Sync with `lib/parse-options.js`
  return parse(string, {
    ignoreTag: true,
  });
}
