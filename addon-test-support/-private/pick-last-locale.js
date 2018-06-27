import castArray from 'lodash.castarray';
import last from 'lodash.last';

/**
 * Picks the last locale from a locales array. In case of a string value,
 * returns that string.
 *
 * @private
 * @function
 * @param {string|string[]} locales
 * @return {string}
 */
export default locales => last(castArray(locales));
