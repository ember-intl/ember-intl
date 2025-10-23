import type FormatDateHelper from './helpers/format-date.ts';
import type FormatDateRangeHelper from './helpers/format-date-range.ts';
import type FormatListHelper from './helpers/format-list.ts';
import type FormatMessageHelper from './helpers/format-message.ts';
import type FormatNumberHelper from './helpers/format-number.ts';
import type FormatRelativeTimeHelper from './helpers/format-relative-time.ts';
import type FormatTimeHelper from './helpers/format-time.ts';
import type THelper from './helpers/t.ts';

export default interface EmberIntlRegistry {
  'format-date': typeof FormatDateHelper;
  'format-date-range': typeof FormatDateRangeHelper;
  'format-list': typeof FormatListHelper;
  'format-message': typeof FormatMessageHelper;
  'format-number': typeof FormatNumberHelper;
  'format-relative-time': typeof FormatRelativeTimeHelper;
  'format-time': typeof FormatTimeHelper;
  t: typeof THelper;
}
