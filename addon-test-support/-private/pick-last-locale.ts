// @ts-ignore We don't won't to bring along extra baggage, when installed in a
// host project.
import castArray from 'lodash.castarray';
// @ts-ignore
import last from 'lodash.last';

/**
 * Picks the last locale from a locales array. In case of a string value,
 * returns that string.
 *
 * @private
 * @function
 * @param {string|string[]} locale
 * @return {string}
 * @hide
 */
export const pickLastLocale = (locale: string | [string, ...string[]]) => last(castArray(locale)) as string;
export default pickLastLocale;
