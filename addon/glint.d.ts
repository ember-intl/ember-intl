import FormatDateHelper from 'ember-intl/helpers/format-date';
import FormatListHelper from 'ember-intl/helpers/format-list';
import FormatMessageHelper from 'ember-intl/helpers/format-message';
import FormatNumberHelper from 'ember-intl/helpers/format-number';
import FormatRelativeHelper from 'ember-intl/helpers/format-relative';
import FormatTimeHelper from 'ember-intl/helpers/format-time';
import THelper from 'ember-intl/helpers/t';

declare module '@glint/environment-ember-loose/registry' {
  export default interface Registry {
    'format-date': typeof FormatDateHelper;
    'format-list': typeof FormatListHelper;
    'format-message': typeof FormatMessageHelper;
    'format-number': typeof FormatNumberHelper;
    'format-relative': typeof FormatRelativeHelper;
    'format-time': typeof FormatTimeHelper;
    t: typeof THelper;
  }
}
