import type { CustomFormats as FormatjsFormats } from '@formatjs/intl';

export type Formats = Partial<{
  formatDate: FormatjsFormats['date'];
  formatDateRange: FormatjsFormats['dateTimeRange'];
  formatNumber: FormatjsFormats['number'];
  formatRelativeTime: FormatjsFormats['relative'];
  formatTime: FormatjsFormats['time'];
}>;

export function convertToFormatjsFormats(formats: Formats): FormatjsFormats {
  const formatjsFormats: FormatjsFormats = {
    dateTimeRange: formats.formatDateRange,
    date: formats.formatDate,
    number: formats.formatNumber,
    relative: formats.formatRelativeTime,
    time: formats.formatTime,
  };

  return formatjsFormats;
}
