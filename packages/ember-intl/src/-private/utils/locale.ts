export type Locales = [string, ...string[]];

/**
 * @private
 */
export function convertToArray(locale: Locales | string): Locales {
  if (Array.isArray(locale)) {
    return locale;
  }

  return [locale];
}

/**
 * @private
 */
export function convertToString(locale: Locales | string): string {
  if (Array.isArray(locale)) {
    return locale[0];
  }

  return locale;
}

/**
 * @private
 */
export function hasLocaleChanged(locale1: Locales, locale2?: Locales): boolean {
  if (locale2 === undefined) {
    return true;
  }

  return locale1.toString() !== locale2.toString();
}

/**
 * @private
 */
export function normalizeLocale(locale: string): string {
  return locale.replace(/_/g, '-').toLowerCase();
}
