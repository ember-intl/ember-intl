import '@glint/environment-ember-loose';
import '@glint/environment-ember-template-imports';
import 'ember-source/types';
import 'ember-source/types/preview';

import type { HelperLike } from '@glint/template';
import type FormatDateHelper from 'ember-intl/helpers/format-date';
import type FormatListHelper from 'ember-intl/helpers/format-list';
import type FormatMessageHelper from 'ember-intl/helpers/format-message';
import type FormatNumberHelper from 'ember-intl/helpers/format-number';
import type FormatRelativeHelper from 'ember-intl/helpers/format-relative';
import type FormatTimeHelper from 'ember-intl/helpers/format-time';
import type THelper from 'ember-intl/helpers/t';

interface EmberIntlRegistry {
  'format-date': typeof FormatDateHelper;
  'format-list': typeof FormatListHelper;
  'format-message': typeof FormatMessageHelper;
  'format-number': typeof FormatNumberHelper;
  'format-relative': typeof FormatRelativeHelper;
  'format-time': typeof FormatTimeHelper;
  t: typeof THelper;
}

type PageTitleHelper = HelperLike<{
  Args: { Positional: [title: string] };
  Return: void;
}>;

declare module '@glint/environment-ember-loose/registry' {
  export default interface Registry extends EmberIntlRegistry {
    // Add any registry entries from other addons here that your addon itself uses (in non-strict mode templates)
    // See https://typed-ember.gitbook.io/glint/using-glint/ember/using-addons
    'page-title': PageTitleHelper;
  }
}
