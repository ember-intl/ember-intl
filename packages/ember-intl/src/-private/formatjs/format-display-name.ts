import type { IntlShape } from '@formatjs/intl';

type FormatjsParameters = Parameters<IntlShape<string>['formatDisplayName']>;

export type FormatDisplayNameParameters = [
  FormatjsParameters[0],
  (
    | {
        fallback?: FormatjsParameters[1]['fallback'];
        languageDisplay?: FormatjsParameters[1]['languageDisplay'];
        locale?: string;
        style?: FormatjsParameters[1]['style'];
        type: 'language';
      }
    | {
        fallback?: FormatjsParameters[1]['fallback'];
        locale?: string;
        style?: FormatjsParameters[1]['style'];
        type: Exclude<FormatjsParameters[1]['type'], 'language'>;
      }
  ),
];

export function formatDisplayName(
  intlShape: IntlShape,
  ...[value, formatOptions]: FormatDisplayNameParameters
): string {
  return intlShape.formatDisplayName(value, formatOptions) ?? '';
}
