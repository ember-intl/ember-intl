import type { IntlShape } from '@formatjs/intl';

/**
 * @deprecated
 */
export type FormatRelativeParameters = Parameters<
  IntlShape<string>['formatRelativeTime']
>;

/**
 * @deprecated
 */
export function formatRelative(
  intlShape: IntlShape,
  ...[value, unit, formatOptions]: FormatRelativeParameters
): string {
  return intlShape.formatRelativeTime(value, unit, formatOptions);
}
