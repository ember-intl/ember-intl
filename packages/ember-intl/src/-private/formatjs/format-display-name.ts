import type { IntlShape } from '@formatjs/intl';

export type FormatDisplayNameParameters = Parameters<
  IntlShape<string>['formatDisplayName']
>;

export function formatDisplayName(
  intlShape: IntlShape,
  ...[value, formatOptions]: FormatDisplayNameParameters
): string {
  return intlShape.formatDisplayName(value, formatOptions);
}
