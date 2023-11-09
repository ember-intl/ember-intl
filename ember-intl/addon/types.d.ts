import type { Formats as BaseFormats } from 'intl-messageformat';

import type { RelativeTimeFormatOptions } from './-private/formatters/format-relative';
import type { NestedStructure } from './-private/utils/flatten';

export interface Formats extends Partial<BaseFormats> {
  relative?: Record<string, RelativeTimeFormatOptions>;
}

export type Translations = NestedStructure<string | number>;
