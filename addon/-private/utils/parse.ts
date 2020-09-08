import { parse } from 'intl-messageformat-parser';

/**
 * @private
 * @hide
 */
export default function parseString(string: string) {
  // ! Sync with `lib/message-validator/validate-message.js`
  return parse(string, {
    normalizeHashtagInPlural: false,
    ignoreTag: true,
  });
}
