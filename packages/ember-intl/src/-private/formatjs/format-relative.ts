import type { IntlShape } from '@formatjs/intl';

export type FormatRelativeParameters = Parameters<
  IntlShape<string>['formatRelativeTime']
>;

export function formatRelative(
  intlShape: IntlShape,
  ...[value, unit, formatOptions]: FormatRelativeParameters
): string {
  return intlShape.formatRelativeTime(value, unit, formatOptions);
}
