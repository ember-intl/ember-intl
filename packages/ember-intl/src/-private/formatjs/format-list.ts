import type { IntlShape } from '@formatjs/intl';

export type FormatListParameters = Parameters<IntlShape<string>['formatList']>;

export function formatList(
  intlShape: IntlShape,
  ...[value, formatOptions]: FormatListParameters
): string {
  return intlShape.formatList(value, formatOptions);
}
