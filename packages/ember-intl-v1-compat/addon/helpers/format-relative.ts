import Helper from '@ember/component/helper';
import { inject as service } from '@ember/service';

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

export default class FormatRelativeHelper extends Helper<FormatRelativeSignature> {
  @service declare intl: IntlService;

  compute(
    [value]: FormatRelativeSignature['Args']['Positional'],
    options: FormatRelativeSignature['Args']['Named'],
  ) {
    return this.intl.formatRelative(value, options);
  }
}
