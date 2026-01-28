import Helper from '@ember/component/helper';
import { service } from '@ember/service';

import type IntlService from '../services/intl.ts';

type FormatParameters = Parameters<IntlService['formatMessage']>;
type Value = FormatParameters[0];
type Options = FormatParameters[1];

interface FormatMessageSignature {
  Args: {
    Named?: Options;
    Positional: [Value];
  };
  Return: string;
}

export default class FormatMessageHelper extends Helper<FormatMessageSignature> {
  @service declare intl: IntlService;

  compute(
    [value]: FormatMessageSignature['Args']['Positional'],
    options: FormatMessageSignature['Args']['Named'],
  ) {
    return this.intl.formatMessage(value, options);
  }
}
