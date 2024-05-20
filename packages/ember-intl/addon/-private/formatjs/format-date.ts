import type { IntlShape } from '@formatjs/intl';

export type FormatDateParameters = Parameters<IntlShape<string>['formatDate']>;

export function formatDate(
  intlShape: IntlShape,
  ...[value, formatOptions]: FormatDateParameters
): string {
  return intlShape.formatDate(value, formatOptions);
}
