import makeIntlHelper from './-private/make-intl-helper';

/**
 * Invokes the `setLocale` method of the `intl` service.
 *
 * @function
 * @param {string|string[]} locale
 */
export const setLocale = makeIntlHelper('setLocale');
