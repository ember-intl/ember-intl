type MaybeLocale = string[] | string | null | undefined;

/**
 * @private
 * @hide
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
