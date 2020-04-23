import omit from 'lodash.omit';

/**
 * Takes an object and stringifies it in a deterministic way. It will also only
 * include top-level entries.
 *
 * @private
 * @function
 * @param {object} obj
 * @return {string}
 */
const stringifyDeterministically = obj => JSON.stringify(obj, Object.keys(obj).sort());

/**
 * Replaces the `{` and `}` characters with `(` and `)` in order for those to
 * not be interpreted as variables.
 * Replaces the `\"` characters with `"` in order for the additional escape to work.
 * For more details, refer: https://github.com/ember-intl/ember-intl/issues/1035
 *
 * @private
 * @function
 * @param {string} subject
 * @return {string}
 */
const replaceInterpolators = subject =>
  String(subject)
    .replace(/\{/g, '(')
    .replace(/\}/g, ')')
    .replace(/\\"/g, '"');

/**
 * A list of internal options that should not be serialized.
 */
const INTERNAL_OPTIONS = 'resilient default htmlSafe'.split(' ');

/**
 * Takes a translation options object and stringifies it in a deterministic way.
 * It will also only include top-level entries and filter out irrelevant,
 * internal entries.
 *
 * @private
 * @function
 * @param {object} options
 * @return {string}
 */
const stringifyOptions = (options = {}) =>
  replaceInterpolators(stringifyDeterministically(omit(options, INTERNAL_OPTIONS)));

/**
 * Serializes a translation invocation deterministically.
 *
 * @private
 * @function
 * @param {string} key translation key
 * @param {object} [options] options and variables passed along
 * @return {string}
 * @hide
 */
export const serializeTranslation = (key, options) => `t:${key}:${stringifyOptions(options)}`;

/**
 * Used to overwrite the default `intl/missing-message` implementation in order
 * to display a deterministic serialization of the translation for easier
 * assertions in the tests.
 *
 * @private
 * @function
 * @param {string} key translation key
 * @param {string[]} locales list of locales to search through
 * @param {object} [options] options and variables passed along
 * @return {string}
 * @hide
 */
export const missingMessage = (key, locales, options) => serializeTranslation(key, options);
