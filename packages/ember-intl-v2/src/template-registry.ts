import type FormatDateHelper from './helpers/format-date.ts';
import type FormatListHelper from './helpers/format-list.ts';
import type FormatMessageHelper from './helpers/format-message.ts';
import type FormatNumberHelper from './helpers/format-number.ts';
import type FormatRelativeHelper from './helpers/format-relative.ts';
import type FormatTimeHelper from './helpers/format-time.ts';
import type THelper from './helpers/t.ts';

export default interface EmberIntlV2Registry {
  'format-date': typeof FormatDateHelper;
  'format-list': typeof FormatListHelper;
  'format-message': typeof FormatMessageHelper;
  'format-number': typeof FormatNumberHelper;
  'format-relative': typeof FormatRelativeHelper;
  'format-time': typeof FormatTimeHelper;
  t: typeof THelper;
}
