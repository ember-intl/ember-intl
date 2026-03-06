import Helper from '@ember/component/helper';
import { service } from '@ember/service';

import type IntlService from '../services/intl.ts';

type FormatParameters = Parameters<IntlService['formatDisplayName']>;
type Value = FormatParameters[0];
type Options = FormatParameters[1];

interface FormatDisplayNameSignature {
  Args: {
    Named: Options;
    Positional: [Value];
  };
  Return: string;
}

export default class FormatDisplayNameHelper extends Helper<FormatDisplayNameSignature> {
  @service declare intl: IntlService;

  compute(
    [value]: FormatDisplayNameSignature['Args']['Positional'],
    options: FormatDisplayNameSignature['Args']['Named'],
  ): FormatDisplayNameSignature['Return'] {
    return this.intl.formatDisplayName(value, options);
  }
}
