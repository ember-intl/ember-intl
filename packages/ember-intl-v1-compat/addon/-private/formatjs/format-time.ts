import type { IntlShape } from '@formatjs/intl';

export type FormatTimeParameters = Parameters<IntlShape<string>['formatTime']>;

export function formatTime(
  intlShape: IntlShape,
  ...[value, formatOptions]: FormatTimeParameters
): string {
  return intlShape.formatTime(value, formatOptions);
}
