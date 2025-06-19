import Helper from '@ember/component/helper';
import { deprecate } from '@ember/debug';

import service from '../-private/utils/service';
import type IntlService from '../services/intl';

type FormatParameters = Parameters<IntlService['formatRelative']>;
type Value = FormatParameters[0];
type Options = FormatParameters[1];

interface FormatRelativeSignature {
  Args: {
    Named?: Options;
    Positional: [Value];
  };
  Return: string;
}

/**
 * @deprecated
 *
 * `{{format-relative}}` will be renamed to `{{format-relative-time}}` in `ember-intl@8.0.0`.
 * Please rename the helper to `{{format-relative-time}}` in your template now.
 */
export default class FormatRelativeHelper extends Helper<FormatRelativeSignature> {
  @service declare intl: IntlService;

  compute(
    [value]: FormatRelativeSignature['Args']['Positional'],
    options: FormatRelativeSignature['Args']['Named'],
  ) {
    deprecate(
      '{{format-relative}} will be renamed to {{format-relative-time}} in ember-intl@8.0.0. Please rename the helper to {{format-relative-time}} in your template now.',
      false,
      {
        for: 'ember-intl',
        id: 'ember-intl.rename-format-relative-helper',
        since: {
          available: '7.2.0',
          enabled: '7.2.0',
        },
        until: '8.0.0',
        url: 'https://ember-intl.github.io/ember-intl/docs/helpers/introduction',
      },
    );

    return this.intl.formatRelative(value, options);
  }
}
