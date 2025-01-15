import type { IntlShape } from '@formatjs/intl';

export type FormatNumberParameters = Parameters<
  IntlShape<string>['formatNumber']
>;

export function formatNumber(
  intlShape: IntlShape,
  ...[value, formatOptions]: FormatNumberParameters
): string {
  return intlShape.formatNumber(value, formatOptions);
}
