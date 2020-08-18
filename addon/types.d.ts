import type { Formats as BaseFormats } from 'intl-messageformat';
import { RelativeTimeFormatOptions } from './-private/formatters/format-relative';

export interface Formats extends BaseFormats {
  relative: Record<string, RelativeTimeFormatOptions>;
}
