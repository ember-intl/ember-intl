import type { IntlShape, MessageDescriptor } from '@formatjs/intl';

export type FormatMessageParameters = [
  descriptor: MessageDescriptor,
  data?: Parameters<IntlShape<string>['formatMessage']>[1],
];

export function formatMessage(
  intlShape: IntlShape,
  ...[descriptor, data]: FormatMessageParameters
): string {
  return intlShape.formatMessage(descriptor, data, {
    ignoreTag: true,
  }) as string;
}
