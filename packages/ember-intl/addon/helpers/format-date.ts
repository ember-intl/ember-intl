import Helper from '@ember/component/helper';
import { inject as service } from '@ember/service';

import type IntlService from '../services/intl';

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

  constructor() {
    // eslint-disable-next-line prefer-rest-params
    super(...arguments);

    // @ts-expect-error: Property 'onLocaleChanged' is private and only accessible within class 'IntlService'.
    this.intl.onLocaleChanged(this.recompute, this);
  }

  compute(
    [value]: FormatDateSignature['Args']['Positional'],
    options: FormatDateSignature['Args']['Named'],
  ) {
    return this.intl.formatDate(value, options);
  }
}
