import Helper from '@ember/component/helper';
import { inject as service } from '@ember/service';

import type IntlService from '../services/intl';

type FormatParameters = Parameters<IntlService['formatDate']>;
type Value = FormatParameters[0];
type Options = FormatParameters[1];

interface FormatDateSignature {
  Args: {
    Named?: Options;
    Positional: [Value] | [Value, Options];
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
    [value, positionalOptions]: FormatDateSignature['Args']['Positional'],
    namedOptions: FormatDateSignature['Args']['Named'],
  ) {
    const options = positionalOptions
      ? Object.assign({}, positionalOptions, namedOptions)
      : namedOptions;

    return this.intl.formatDate(value, options);
  }
}
