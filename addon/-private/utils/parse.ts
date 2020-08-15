import { parse } from 'intl-messageformat-parser';

/**
 * @private
 * @hide
 */
export default function parseString(string: string) {
  return parse(string, {
    normalizeHashtagInPlural: false,
  });
}
