import Helper from '@ember/component/helper';
import { service } from '@ember/service';

import type IntlService from '../services/intl';

type FormatParameters = Parameters<IntlService['formatList']>;
type Value = FormatParameters[0];
type Options = FormatParameters[1];

interface FormatListSignature {
  Args: {
    Named?: Options;
    Positional: [Value];
  };
  Return: string;
}

export default class FormatListHelper extends Helper<FormatListSignature> {
  @service declare intl: IntlService;

  compute(
    [value]: FormatListSignature['Args']['Positional'],
    options: FormatListSignature['Args']['Named'],
  ) {
    return this.intl.formatList(value, options);
  }
}
