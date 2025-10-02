import Helper from '@ember/component/helper';
import { service } from '@ember/service';

import type IntlService from '../services/intl';

type FormatParameters = Parameters<IntlService['formatDateRange']>;
type From = FormatParameters[0];
type To = FormatParameters[1];
type Options = FormatParameters[2];

interface FormatDateRangeSignature {
  Args: {
    Named?: Options;
    Positional: [From, To];
  };
  Return: string;
}

export default class FormatDateRangeHelper extends Helper<FormatDateRangeSignature> {
  @service declare intl: IntlService;

  compute(
    [from, to]: FormatDateRangeSignature['Args']['Positional'],
    options: FormatDateRangeSignature['Args']['Named'],
  ) {
    return this.intl.formatDateRange(from, to, options);
  }
}
