import { ErrorCode } from 'intl-messageformat';

/**
 * An error that indicates a required Intl API was not available
 * at runtime. This is generally resolved by polyfilling the missing API.
 *
 * @public
 */
export const MISSING_INTL_API = ErrorCode.MISSING_INTL_API;

/**
 * An error type that indicates a translation that was looked up
 * by a specific key was not found.
 *
 * @public
 */
export const MISSING_TRANSLATION = Symbol();
