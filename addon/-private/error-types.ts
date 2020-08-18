import { ErrorCode } from 'intl-messageformat';

/**
 * An error that indicates a required Intl API was not available
 * at runtime. This is generally resolved by polyfilling the missing API.
 *
 * @private
 * @hide
 */
// @ts-ignore If the consuming project uses `--isolatedModules`, `const enums`
// may not be used. Since `ember-cli-babel` does not care for `const enums`
// _anyway_ , this is not an issue.
export const MISSING_INTL_API = ErrorCode.MISSING_INTL_API;

/**
 * An error type that indicates a translation that was looked up
 * by a specific key was not found.
 *
 * @private
 * @hide
 */
export const MISSING_TRANSLATION = 'MISSING_TRANSLATION';
