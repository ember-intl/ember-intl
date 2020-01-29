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
export default function pickLastLocale(locale: string | string[]) {
  if (Array.isArray(locale)) {
    return locale[locale.length - 1];
  }

  return locale;
}
