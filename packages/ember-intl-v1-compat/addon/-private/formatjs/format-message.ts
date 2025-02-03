import type { IntlShape } from '@formatjs/intl';

export type FormatMessageParameters = Parameters<
  IntlShape<string>['formatMessage']
>;

export function formatMessage(
  intlShape: IntlShape,
  ...[descriptor, parameters]: FormatMessageParameters
): string {
  return intlShape.formatMessage(descriptor, parameters, {
    ignoreTag: true,
  }) as string;
}
