import Helper from '@ember/component/helper';
import { service } from '@ember/service';

import type IntlService from '../services/intl.ts';

type FormatParameters = Parameters<IntlService['formatDate']>;
type Value = FormatParameters[0];
type Options = FormatParameters[1];

interface FormatDateSignature {
  Args: {
    Named?: Options;
    Positional: [Value];
  };
  Return: string;
}

export default class FormatDateHelper extends Helper<FormatDateSignature> {
  @service declare intl: IntlService;

  compute(
    [value]: FormatDateSignature['Args']['Positional'],
    options: FormatDateSignature['Args']['Named'],
  ): FormatDateSignature['Return'] {
    return this.intl.formatDate(value, options);
  }
}
