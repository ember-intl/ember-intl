import { RelativeTimeFormatOptions } from './-private/formatters/format-relative';

export interface Formats {
  date: Record<string, Intl.DateTimeFormatOptions>;
  time: Record<string, Intl.DateTimeFormatOptions>;
  relative: Record<string, RelativeTimeFormatOptions>;
  number: Record<string, Intl.NumberFormatOptions>;
}
