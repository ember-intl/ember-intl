import castArray from 'lodash.castarray';
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
export default (locale) => last(castArray(locale));
