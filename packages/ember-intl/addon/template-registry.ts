import type FormatDateHelper from './helpers/format-date';
import type FormatListHelper from './helpers/format-list';
import type FormatMessageHelper from './helpers/format-message';
import type FormatNumberHelper from './helpers/format-number';
import type FormatRelativeHelper from './helpers/format-relative';
import type FormatTimeHelper from './helpers/format-time';
import type THelper from './helpers/t';

export default interface EmberIntlRegistry {
  'format-date': typeof FormatDateHelper;
  'format-list': typeof FormatListHelper;
  'format-message': typeof FormatMessageHelper;
  'format-number': typeof FormatNumberHelper;
  'format-relative': typeof FormatRelativeHelper;
  'format-time': typeof FormatTimeHelper;
  t: typeof THelper;
}
