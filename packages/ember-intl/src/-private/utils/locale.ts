/**
 * @private
 */
export function convertToArray(locale: string | string[]): string[] {
  if (Array.isArray(locale)) {
    return locale;
  }

  return [locale];
}

/**
 * @private
 */
export function convertToString(locale: string | string[]): string {
  if (Array.isArray(locale)) {
    return locale[0]!;
  }

  return locale;
}

type MaybeLocale = string[] | string | null | undefined;

/**
 * @private
 */
export function hasLocaleChanged(
  locale1: string[],
  locale2: MaybeLocale,
): boolean {
  if (!Array.isArray(locale2)) {
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
