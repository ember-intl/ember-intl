import type { IntlShape } from '@formatjs/intl';

export type FormatDateRangeParameters = Parameters<
  IntlShape<string>['formatDateTimeRange']
>;

export function formatDateRange(
  intlShape: IntlShape,
  ...[from, to, formatOptions]: FormatDateRangeParameters
): string {
  return intlShape.formatDateTimeRange(from, to, formatOptions);
}
