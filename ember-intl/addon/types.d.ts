import type { Formats as BaseFormats } from 'intl-messageformat';

import type { RelativeTimeFormatOptions } from './-private/formatters/format-relative';
import type { Translations } from './-private/utils/translations';

export interface Formats extends Partial<BaseFormats> {
  relative?: Record<string, RelativeTimeFormatOptions>;
}

export type { Translations };
