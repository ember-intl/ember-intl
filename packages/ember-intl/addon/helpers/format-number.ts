import Helper from '@ember/component/helper';

import service from '../-private/utils/service';
import type IntlService from '../services/intl';

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
  ) {
    return this.intl.formatNumber(value, options);
  }
}
