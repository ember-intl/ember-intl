import Helper from '@ember/component/helper';
import { service } from '@ember/service';

import type IntlService from '../services/intl';

type FormatParameters = Parameters<IntlService['formatRelativeTime']>;
type Value = FormatParameters[0];
type Options = FormatParameters[1];

interface FormatRelativeTimeSignature {
  Args: {
    Named?: Options;
    Positional: [Value];
  };
  Return: string;
}

export default class FormatRelativeTimeHelper extends Helper<FormatRelativeTimeSignature> {
  @service declare intl: IntlService;

  compute(
    [value]: FormatRelativeTimeSignature['Args']['Positional'],
    options: FormatRelativeTimeSignature['Args']['Named'],
  ) {
    return this.intl.formatRelativeTime(value, options);
  }
}
