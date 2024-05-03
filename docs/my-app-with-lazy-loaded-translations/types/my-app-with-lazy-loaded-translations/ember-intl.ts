import type FormatDateHelper from 'ember-intl/helpers/format-date';
import type FormatListHelper from 'ember-intl/helpers/format-list';
import type FormatMessageHelper from 'ember-intl/helpers/format-message';
import type FormatNumberHelper from 'ember-intl/helpers/format-number';
import type FormatRelativeHelper from 'ember-intl/helpers/format-relative';
import type FormatTimeHelper from 'ember-intl/helpers/format-time';
import type THelper from 'ember-intl/helpers/t';

export default interface EmberIntlRegistry {
  'format-date': typeof FormatDateHelper;
  'format-list': typeof FormatListHelper;
  'format-message': typeof FormatMessageHelper;
  'format-number': typeof FormatNumberHelper;
  'format-relative': typeof FormatRelativeHelper;
  'format-time': typeof FormatTimeHelper;
  t: typeof THelper;
}
