import Helper from '@ember/component/helper';
import { service } from '@ember/service';

import type IntlService from '../services/intl.ts';

type FormatParameters = Parameters<IntlService['formatNumber']>;
type Value = FormatParameters[0];
type Options = FormatParameters[1];

interface FormatNumberSignature {
  Args: {
    Named?: Options;
    Positional: [Value];
  };
  Return: string;
}

export default class FormatNumberHelper extends Helper<FormatNumberSignature> {
  @service declare intl: IntlService;

  compute(
    [value]: FormatNumberSignature['Args']['Positional'],
    options: FormatNumberSignature['Args']['Named'],
  ): FormatNumberSignature['Return'] {
    return this.intl.formatNumber(value, options);
  }
}
