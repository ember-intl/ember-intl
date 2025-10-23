import type { CustomFormats as FormatjsFormats } from '@formatjs/intl';

export type Formats = Partial<{
  'format-date': FormatjsFormats['date'];
  'format-date-range': FormatjsFormats['dateTimeRange'];
  'format-number': FormatjsFormats['number'];
  'format-relative-time': FormatjsFormats['relative'];
  'format-time': FormatjsFormats['time'];
}>;

export type { FormatjsFormats };

export function convertToFormatjsFormats(formats: Formats): FormatjsFormats {
  const formatjsFormats: FormatjsFormats = {
    dateTimeRange: formats['format-date-range'],
    date: formats['format-date'],
    number: formats['format-number'],
    relative: formats['format-relative-time'],
    time: formats['format-time'],
  };

  return formatjsFormats;
}
