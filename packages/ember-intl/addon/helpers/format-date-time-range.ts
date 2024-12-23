import Helper from '@ember/component/helper';
import { inject as service } from '@ember/service';

import type IntlService from '../services/intl';

type FormatParameters = Parameters<IntlService['formatDateTimeRange']>;
type From = FormatParameters[0];
type To = FormatParameters[1];
type Options = FormatParameters[2];

interface FormatDateTimeRangeSignature {
  Args: {
    Named?: Options;
    Positional: [From, To];
  };
  Return: string;
}

export default class FormatDateTimeRangeHelper extends Helper<FormatDateTimeRangeSignature> {
  @service declare intl: IntlService;

  compute(
    [from, to]: FormatDateTimeRangeSignature['Args']['Positional'],
    options: FormatDateTimeRangeSignature['Args']['Named'],
  ) {
    return this.intl.formatDateTimeRange(from, to, options);
  }
}
