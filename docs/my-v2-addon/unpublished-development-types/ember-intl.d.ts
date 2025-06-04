import type FormatDateHelper from 'ember-intl/helpers/format-date';
import type FormatDateRangeHelper from 'ember-intl/helpers/format-date-range';
import type FormatListHelper from 'ember-intl/helpers/format-list';
import type FormatMessageHelper from 'ember-intl/helpers/format-message';
import type FormatNumberHelper from 'ember-intl/helpers/format-number';
import type FormatRelativeHelper from 'ember-intl/helpers/format-relative';
import type FormatRelativeTimeHelper from 'ember-intl/helpers/format-relative-time';
import type FormatTimeHelper from 'ember-intl/helpers/format-time';
import type THelper from 'ember-intl/helpers/t';

export default interface EmberIntlRegistry {
  'format-date': typeof FormatDateHelper;
  'format-date-range': typeof FormatDateRangeHelper;
  'format-list': typeof FormatListHelper;
  'format-message': typeof FormatMessageHelper;
  'format-number': typeof FormatNumberHelper;
  'format-relative': typeof FormatRelativeHelper;
  'format-relative-time': typeof FormatRelativeTimeHelper;
  'format-time': typeof FormatTimeHelper;
  t: typeof THelper;
}
