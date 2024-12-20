import type { IntlShape } from '@formatjs/intl';

export type FormatDateTimeRangeParameters = Parameters<
  IntlShape<string>['formatDateTimeRange']
>;

export function formatDateTimeRange(
  intlShape: IntlShape,
  ...[from, to, formatOptions]: FormatDateTimeRangeParameters
): string {
  return intlShape.formatDateTimeRange(from, to, formatOptions);
}
