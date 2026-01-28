import Helper from '@ember/component/helper';
import { service } from '@ember/service';

import type IntlService from '../services/intl.ts';

type FormatParameters = Parameters<IntlService['formatTime']>;
type Value = FormatParameters[0];
type Options = FormatParameters[1];

interface FormatTimeSignature {
  Args: {
    Named?: Options;
    Positional: [Value];
  };
  Return: string;
}

export default class FormatTimeHelper extends Helper<FormatTimeSignature> {
  @service declare intl: IntlService;

  compute(
    [value]: FormatTimeSignature['Args']['Positional'],
    options: FormatTimeSignature['Args']['Named'],
  ): FormatTimeSignature['Return'] {
    return this.intl.formatTime(value, options);
  }
}
