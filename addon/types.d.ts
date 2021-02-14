import type { Formats as BaseFormats } from 'intl-messageformat';
import { RelativeTimeFormatOptions } from './-private/formatters/format-relative';
import { NestedStructure } from './-private/utils/flatten';

export interface Formats extends Partial<BaseFormats> {
  relative?: Record<string, RelativeTimeFormatOptions>;
}

export type Translations = NestedStructure<string | number>;
