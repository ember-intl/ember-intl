import type FormatDateHelper from './helpers/format-date';
import type FormatDateRangeHelper from './helpers/format-date-range';
import type FormatListHelper from './helpers/format-list';
import type FormatMessageHelper from './helpers/format-message';
import type FormatNumberHelper from './helpers/format-number';
import type FormatRelativeTimeHelper from './helpers/format-relative-time';
import type FormatTimeHelper from './helpers/format-time';
import type THelper from './helpers/t';

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
