import { parse } from '@formatjs/intl-messageformat-parser';

/**
 * @private
 * @hide
 */
export default function parseString(string: string) {
  // ! Sync with `lib/parse-options.js`
  return parse(string, {
    normalizeHashtagInPlural: false,
    ignoreTag: true,
  });
}
