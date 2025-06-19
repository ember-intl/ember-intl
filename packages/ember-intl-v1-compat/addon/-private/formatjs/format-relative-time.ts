import type { IntlShape } from '@formatjs/intl';

export type FormatRelativeTimeParameters = Parameters<
  IntlShape<string>['formatRelativeTime']
>;

export function formatRelativeTime(
  intlShape: IntlShape,
  ...[value, unit, formatOptions]: FormatRelativeTimeParameters
): string {
  return intlShape.formatRelativeTime(value, unit, formatOptions);
}
