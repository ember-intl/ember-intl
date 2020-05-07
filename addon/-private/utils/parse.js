import IntlMessageFormat from 'intl-messageformat-parser';

/**
 * @private
 * @hide
 */
export default function parseString(string) {
  return IntlMessageFormat.parse(string, {
    normalizeHashtagInPlural: false,
  });
}
